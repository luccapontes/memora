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
    const checkAuth = async () => {
      try {
        const savedUser = await storage.getItem('@Memora:user');
        const savedToken = await storage.getItem('@Memora:token');
        
        if (savedUser && savedToken) {
          const userData = JSON.parse(savedUser);
          setUser(userData);
          setIsAuthenticated(true);
          apiService.setToken(savedToken);
          console.log('User restored from storage:', userData);
        } else {
          console.log('No saved user found');
        }
      } catch (error) {
        console.log('Error checking auth:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    console.log('Attempting login with:', email);
    
    // Always use mock authentication for now
    if (email === 'sofia@escola.com' && password === '123456') {
      const mockUserData = { ...mockUser, email };
      setUser(mockUserData);
      setIsAuthenticated(true);
      
      // Save to storage
      try {
        await storage.setItem('@Memora:user', JSON.stringify(mockUserData));
        await storage.setItem('@Memora:token', JSON.stringify('mock-token'));
        console.log('Login successful:', mockUserData);
        return true;
      } catch (error) {
        console.error('Error saving to storage:', error);
        // Even if storage fails, still authenticate
        setUser(mockUserData);
        setIsAuthenticated(true);
        return true;
      }
    } else {
      console.log('Invalid credentials');
      return false;
    }
  };

  const logout = async () => {
    console.log('Logging out');
    setUser(null);
    setIsAuthenticated(false);
    apiService.setToken('');
    try {
      await storage.removeItem('@Memora:user');
      await storage.removeItem('@Memora:token');
    } catch (error) {
      console.error('Error removing from storage:', error);
    }
  };

  const register = async (userData: Partial<User>): Promise<boolean> => {
    try {
      const newUser = {
        ...mockUser,
        id: Date.now().toString(),
        ...userData,
      } as User;
      
      setUser(newUser);
      setIsAuthenticated(true);
      
      await storage.setItem('@Memora:user', JSON.stringify(newUser));
      await storage.setItem('@Memora:token', JSON.stringify('mock-token'));
      
      return true;
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