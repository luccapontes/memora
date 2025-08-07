export interface User {
  id: string;
  name: string;
  email: string;
  cpf: string;
  birthDate: string;
  class: string;
  password?: string;
}

export interface Quiz {
  id: number;
  question: string;
  alternatives: string[];
  correct: number;
  subject: string;
}

export interface Summary {
  id: number;
  subject: string;
  title: string;
  description: string;
  image: string;
  date: string;
}

export interface Notification {
  id: number;
  type: 'scheduled' | 'received';
  title: string;
  description: string;
  time: string;
  image: string;
  emoji: string;
}

export interface DailyActivity {
  id: number;
  title: string;
  description: string;
  time: string;
  image: string;
}

export interface ProgressData {
  daily: number;
  weekly: number;
  monthly: number;
}

export interface CalendarDay {
  date: number;
  hasActivity: boolean;
  isToday: boolean;
}

export interface AnalysisData {
  quizzesCompleted: number;
  summariesReviewed: number;
  averageScore: number;
  subjects: {
    name: string;
    score: number;
  }[];
} 