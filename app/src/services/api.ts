import { User, Quiz, Summary, ProgressData, AnalysisData } from '../types';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api';

class ApiService {
  private token: string | null = null;

  setToken(token: string) {
    this.token = token;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string> || {}),
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();
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
    return this.request(`/quizzes${params}`);
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
    return this.request(`/summaries${params}`);
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