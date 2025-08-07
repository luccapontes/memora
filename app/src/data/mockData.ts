import { User, Quiz, Summary, Notification, DailyActivity, ProgressData, CalendarDay, AnalysisData } from '../types';

export const mockUser: User = {
  id: '1',
  name: 'Sofia',
  email: 'sofia@escola.com',
  cpf: '123.456.789-00',
  birthDate: '2006-05-15',
  class: '2º Ano A',
};

export const mockQuizzes: Quiz[] = [
  {
    id: 1,
    question: 'Qual é a capital da França?',
    alternatives: ['Berlim', 'Paris', 'Roma', 'Madri'],
    correct: 1,
    subject: 'Geografia'
  },
  {
    id: 2,
    question: 'Qual é a fórmula da água?',
    alternatives: ['H2O', 'CO2', 'O2', 'N2'],
    correct: 0,
    subject: 'Química'
  },
  {
    id: 3,
    question: 'Quem escreveu "Dom Casmurro"?',
    alternatives: ['Machado de Assis', 'José de Alencar', 'Eça de Queirós', 'Aluísio Azevedo'],
    correct: 0,
    subject: 'Português'
  },
  {
    id: 4,
    question: 'Qual é o resultado de 15 x 8?',
    alternatives: ['120', '115', '125', '130'],
    correct: 0,
    subject: 'Matemática'
  },
  {
    id: 5,
    question: 'Em que ano começou a Segunda Guerra Mundial?',
    alternatives: ['1939', '1940', '1941', '1942'],
    correct: 0,
    subject: 'História'
  }
];

export const mockSummaries: Summary[] = [
  {
    id: 1,
    subject: 'Matemática',
    title: 'Geometria Espacial',
    description: 'A geometria espacial é o ramo da matemática que estuda figuras tridimensionais, focando nas propriedades e relações de objetos como cubos, esferas e pirâmides.',
    image: 'https://via.placeholder.com/150x100/4A90E2/FFFFFF?text=Geometria',
    date: '2024-07-05'
  },
  {
    id: 2,
    subject: 'Português',
    title: 'Concordância Verbal',
    description: 'A concordância verbal é a harmonia entre o verbo e o sujeito na frase, garantindo clareza e correção gramatical.',
    image: 'https://via.placeholder.com/150x100/50C878/FFFFFF?text=Português',
    date: '2024-07-04'
  },
  {
    id: 3,
    subject: 'História',
    title: 'Revolução Francesa',
    description: 'A Revolução Francesa foi um período de agitação social e política na França de 1789 a 1799, marcado pela queda da monarquia e ascensão da burguesia.',
    image: 'https://via.placeholder.com/150x100/FF6B6B/FFFFFF?text=História',
    date: '2024-07-03'
  }
];

export const mockNotifications: Notification[] = [
  {
    id: 1,
    type: 'scheduled',
    title: 'Hora de revisar',
    description: 'Biologia: veja esse resumo curto',
    time: '10:00 AM',
    image: 'https://via.placeholder.com/80x80/90EE90/FFFFFF?text=Bio',
    emoji: '⏰'
  },
  {
    id: 2,
    type: 'received',
    title: 'Responda 3 perguntas',
    description: 'sobre História agora!',
    time: '10:00 AM',
    image: 'https://via.placeholder.com/80x80/98FB98/FFFFFF?text=Hist',
    emoji: '🤔'
  }
];

export const mockDailyActivities: DailyActivity[] = [
  {
    id: 1,
    title: 'Resumo do dia',
    description: 'Revisão rápida dos principais tópicos abordados hoje.',
    time: '10 minutos',
    image: 'https://via.placeholder.com/120x80/F5DEB3/FFFFFF?text=Resumo'
  },
  {
    id: 2,
    title: 'Miniquiz',
    description: 'Teste seus conhecimentos com um quiz rápido sobre o conteúdo de hoje.',
    time: '5 minutos',
    image: 'https://via.placeholder.com/120x80/F5DEB3/FFFFFF?text=Quiz'
  },
  {
    id: 3,
    title: 'Revisar matéria antiga',
    description: 'Reforce o aprendizado revisando tópicos de semanas anteriores.',
    time: '15 minutos',
    image: 'https://via.placeholder.com/120x80/F5DEB3/FFFFFF?text=Revisão'
  }
];

export const mockProgressData: ProgressData = {
  daily: 60,
  weekly: 75,
  monthly: 85
};

export const mockCalendarDays: CalendarDay[] = [
  { date: 1, hasActivity: false, isToday: false },
  { date: 2, hasActivity: true, isToday: false },
  { date: 3, hasActivity: false, isToday: false },
  { date: 4, hasActivity: true, isToday: false },
  { date: 5, hasActivity: true, isToday: true },
  { date: 6, hasActivity: false, isToday: false },
  { date: 7, hasActivity: false, isToday: false },
  { date: 8, hasActivity: true, isToday: false },
  { date: 9, hasActivity: false, isToday: false },
  { date: 10, hasActivity: true, isToday: false },
  { date: 11, hasActivity: false, isToday: false },
  { date: 12, hasActivity: true, isToday: false },
  { date: 13, hasActivity: false, isToday: false },
  { date: 14, hasActivity: true, isToday: false },
  { date: 15, hasActivity: false, isToday: false },
  { date: 16, hasActivity: true, isToday: false },
  { date: 17, hasActivity: false, isToday: false },
  { date: 18, hasActivity: true, isToday: false },
  { date: 19, hasActivity: false, isToday: false },
  { date: 20, hasActivity: true, isToday: false },
  { date: 21, hasActivity: false, isToday: false },
  { date: 22, hasActivity: true, isToday: false },
  { date: 23, hasActivity: false, isToday: false },
  { date: 24, hasActivity: true, isToday: false },
  { date: 25, hasActivity: false, isToday: false },
  { date: 26, hasActivity: true, isToday: false },
  { date: 27, hasActivity: false, isToday: false },
  { date: 28, hasActivity: true, isToday: false },
  { date: 29, hasActivity: false, isToday: false },
  { date: 30, hasActivity: true, isToday: false },
  { date: 31, hasActivity: false, isToday: false }
];

export const mockAnalysisData: AnalysisData = {
  quizzesCompleted: 45,
  summariesReviewed: 23,
  averageScore: 78,
  subjects: [
    { name: 'Matemática', score: 85 },
    { name: 'Português', score: 72 },
    { name: 'História', score: 80 },
    { name: 'Geografia', score: 75 },
    { name: 'Biologia', score: 82 }
  ]
}; 