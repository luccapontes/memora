import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { storage } from '../utils/storage';
import { apiService } from '../services/api';
import { mockUser } from '../data/mockData';

interface AuthContextData {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (userData: Partial<User>) => Promise<boolean>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = async () => {
      try {
        const savedUser = await storage.getItem('@Memora:user');
        const savedToken = await storage.getItem('@Memora:token');
        
        if (savedUser && savedToken) {
          const userData = JSON.parse(savedUser);
          const token = JSON.parse(savedToken);
          
          // Set token in API service
          apiService.setToken(token);
          
          // Try to verify token with backend, but fallback to saved user if it fails
          try {
            const profile = await apiService.getProfile();
            setUser(profile);
            setIsAuthenticated(true);
          } catch (error) {
            // If backend is not available, use saved user data
            console.log('Backend not available, using saved user data');
            setUser(userData);
            setIsAuthenticated(true);
          }
        }
      } catch (error) {
        console.log('No saved user found');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Try to login with backend first
      try {
        const response = await apiService.login(email, password);
        
        setUser(response.user);
        setIsAuthenticated(true);
        apiService.setToken(response.token);
        
        // Save to storage
        await storage.setItem('@Memora:user', JSON.stringify(response.user));
        await storage.setItem('@Memora:token', JSON.stringify(response.token));
        
        return true;
      } catch (error) {
        // If backend is not available, use mock authentication
        console.log('Backend not available, using mock authentication');
        
        // Check if credentials match mock user
        if (email === 'sofia@escola.com' && password === '123456') {
          const mockUserData = { ...mockUser, email };
          setUser(mockUserData);
          setIsAuthenticated(true);
          
          // Save to storage
          await storage.setItem('@Memora:user', JSON.stringify(mockUserData));
          await storage.setItem('@Memora:token', JSON.stringify('mock-token'));
          
          return true;
        } else {
          return false;
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = async () => {
    setUser(null);
    setIsAuthenticated(false);
    apiService.setToken('');
    await storage.removeItem('@Memora:user');
    await storage.removeItem('@Memora:token');
  };

  const register = async (userData: Partial<User>): Promise<boolean> => {
    try {
      // Try to register with backend first
      try {
        const response = await apiService.register(userData);
        
        setUser(response.user);
        setIsAuthenticated(true);
        apiService.setToken(response.token);
        
        await storage.setItem('@Memora:user', JSON.stringify(response.user));
        await storage.setItem('@Memora:token', JSON.stringify(response.token));
        
        return true;
      } catch (error) {
        // If backend is not available, create mock user
        console.log('Backend not available, creating mock user');
        
        const newUser = {
          id: Date.now().toString(),
          ...userData,
        } as User;
        
        setUser(newUser);
        setIsAuthenticated(true);
        
        await storage.setItem('@Memora:user', JSON.stringify(newUser));
        await storage.setItem('@Memora:token', JSON.stringify('mock-token'));
        
        return true;
      }
    } catch (error) {
      console.error('Register error:', error);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      login, 
      logout, 
      register, 
      loading 
    }}>
      {children}
    </AuthContext.Provider>
  );
}; 