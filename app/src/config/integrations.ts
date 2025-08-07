export const INTEGRATIONS_CONFIG = {
  // API Configuration
  api: {
    baseUrl: process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api',
    timeout: 10000, // 10 seconds
    retryAttempts: 3,
  },

  // Analytics Configuration
  analytics: {
    enabled: process.env.EXPO_PUBLIC_ANALYTICS_ENABLED === 'true',
    providers: {
      // Add your analytics providers here
      // amplitude: {
      //   apiKey: process.env.EXPO_PUBLIC_AMPLITUDE_API_KEY,
      // },
      // mixpanel: {
      //   token: process.env.EXPO_PUBLIC_MIXPANEL_TOKEN,
      // },
    },
  },

  // Notifications Configuration
  notifications: {
    enabled: true,
    channels: {
      study: {
        id: 'study-reminders',
        name: 'Lembretes de Estudo',
        description: 'Lembretes para estudar e revisar conteúdo',
        importance: 'high',
      },
      quiz: {
        id: 'quiz-notifications',
        name: 'Notificações de Quiz',
        description: 'Notificações sobre novos quizzes disponíveis',
        importance: 'medium',
      },
      general: {
        id: 'general-notifications',
        name: 'Notificações Gerais',
        description: 'Notificações gerais do aplicativo',
        importance: 'low',
      },
    },
  },

  // Cache Configuration
  cache: {
    defaultTTL: 24 * 60 * 60 * 1000, // 24 hours
    maxSize: 50 * 1024 * 1024, // 50MB
    cleanupInterval: 60 * 60 * 1000, // 1 hour
  },

  // Sync Configuration
  sync: {
    enabled: true,
    interval: 5 * 60 * 1000, // 5 minutes
    maxRetries: 3,
    retryDelay: 1000, // 1 second
  },

  // Offline Configuration
  offline: {
    enabled: true,
    maxStorageSize: 100 * 1024 * 1024, // 100MB
    syncOnReconnect: true,
  },

  // Error Reporting Configuration
  errorReporting: {
    enabled: process.env.EXPO_PUBLIC_ERROR_REPORTING_ENABLED === 'true',
    // Add your error reporting service configuration here
    // sentry: {
    //   dsn: process.env.EXPO_PUBLIC_SENTRY_DSN,
    // },
  },

  // Performance Monitoring Configuration
  performance: {
    enabled: process.env.EXPO_PUBLIC_PERFORMANCE_MONITORING_ENABLED === 'true',
    // Add your performance monitoring service configuration here
  },
};

export const getIntegrationConfig = (key: keyof typeof INTEGRATIONS_CONFIG) => {
  return INTEGRATIONS_CONFIG[key];
}; 