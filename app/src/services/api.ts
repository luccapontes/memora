import { User, Quiz, Summary, ProgressData, AnalysisData } from '../types';
import { 
  mockUser, 
  mockQuizzes, 
  mockSummaries, 
  mockProgressData, 
  mockAnalysisData 
} from '../data/mockData';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api';

class ApiService {
  private token: string | null = null;
  private useMockData: boolean = true; // Força uso de dados mockados

  setToken(token: string) {
    this.token = token;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    // Se estiver usando dados mockados, simula uma resposta
    if (this.useMockData) {
      // Simula delay de rede
      await new Promise(resolve => setTimeout(resolve, 300));
      return this.getMockResponse<T>(endpoint, options);
    }

    const url = `${API_BASE_URL}${endpoint}`;
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string> || {}),
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      // Se a requisição falhar, usa dados mockados
      console.log('Backend not available, using mock data for:', endpoint);
      return this.getMockResponse<T>(endpoint, options);
    }
  }

  private getMockResponse<T>(endpoint: string, options: RequestInit = {}): T {
    const method = options.method || 'GET';
    
    // Auth endpoints
    if (endpoint === '/auth/login' && method === 'POST') {
      const body = JSON.parse(options.body as string || '{}');
      if (body.email === 'sofia@escola.com' && body.password === '123456') {
        return {
          user: mockUser,
          token: 'mock-token-123'
        } as T;
      } else {
        throw new Error('E-mail ou senha incorretos');
      }
    }

    if (endpoint === '/auth/register' && method === 'POST') {
      const body = JSON.parse(options.body as string || '{}');
      const newUser = {
        ...mockUser,
        id: Date.now().toString(),
        ...body
      };
      return {
        user: newUser,
        token: 'mock-token-123'
      } as T;
    }

    if (endpoint === '/auth/profile') {
      return mockUser as T;
    }

    // Quiz endpoints
    if (endpoint.startsWith('/quizzes')) {
      if (endpoint.includes('/submit') && method === 'POST') {
        return {
          correct: Math.random() > 0.5,
          score: Math.floor(Math.random() * 100) + 1
        } as T;
      }
      return mockQuizzes as T;
    }

    // Summary endpoints
    if (endpoint.startsWith('/summaries')) {
      if (endpoint.includes('/') && !endpoint.endsWith('/summaries')) {
        const id = parseInt(endpoint.split('/').pop() || '1');
        const summary = mockSummaries.find(s => s.id === id);
        return (summary || mockSummaries[0]) as T;
      }
      return mockSummaries as T;
    }

    // Progress endpoints
    if (endpoint === '/progress') {
      return mockProgressData as T;
    }

    if (endpoint === '/progress/analysis') {
      return mockAnalysisData as T;
    }

    // User endpoints
    if (endpoint === '/users/profile' && method === 'PUT') {
      const body = JSON.parse(options.body as string || '{}');
      const updatedUser = { ...mockUser, ...body };
      return updatedUser as T;
    }

    // Default fallback
    return {} as T;
  }

  // Auth endpoints
  async login(email: string, password: string): Promise<{ user: User; token: string }> {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(userData: Partial<User>): Promise<{ user: User; token: string }> {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async getProfile(): Promise<User> {
    return this.request('/auth/profile');
  }

  // Quiz endpoints
  async getQuizzes(subject?: string): Promise<Quiz[]> {
    const params = subject ? `?subject=${subject}` : '';
    const quizzes = await this.request<Quiz[]>(`/quizzes${params}`);
    
    if (subject) {
      return quizzes.filter(quiz => quiz.subject === subject);
    }
    return quizzes;
  }

  async submitQuiz(quizId: number, answer: number): Promise<{ correct: boolean; score: number }> {
    return this.request(`/quizzes/${quizId}/submit`, {
      method: 'POST',
      body: JSON.stringify({ answer }),
    });
  }

  // Summary endpoints
  async getSummaries(subject?: string): Promise<Summary[]> {
    const params = subject ? `?subject=${subject}` : '';
    const summaries = await this.request<Summary[]>(`/summaries${params}`);
    
    if (subject) {
      return summaries.filter(summary => summary.subject === subject);
    }
    return summaries;
  }

  async getSummary(id: number): Promise<Summary> {
    return this.request(`/summaries/${id}`);
  }

  // Progress endpoints
  async getProgress(): Promise<ProgressData> {
    return this.request('/progress');
  }

  async getAnalysis(): Promise<AnalysisData> {
    return this.request('/progress/analysis');
  }

  // User endpoints
  async updateProfile(userData: Partial<User>): Promise<User> {
    return this.request('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }
}

export const apiService = new ApiService(); 