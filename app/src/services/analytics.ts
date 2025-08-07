interface AnalyticsEvent {
  name: string;
  properties?: Record<string, any>;
  timestamp?: number;
}

interface UserProperties {
  userId: string;
  email?: string;
  name?: string;
  class?: string;
}

class AnalyticsService {
  private isInitialized = false;
  private userId: string | null = null;

  async initialize(): Promise<void> {
    if (this.isInitialized) return;
    
    // Here you can initialize your analytics provider
    // For example: Amplitude, Mixpanel, Firebase Analytics, etc.
    console.log('Analytics service initialized');
    this.isInitialized = true;
  }

  identify(userId: string, properties?: Partial<UserProperties>): void {
    this.userId = userId;
    
    // Send user identification to analytics provider
    console.log('User identified:', { userId, properties });
  }

  track(eventName: string, properties?: Record<string, any>): void {
    const event: AnalyticsEvent = {
      name: eventName,
      properties: {
        ...properties,
        userId: this.userId,
        timestamp: Date.now(),
      },
    };

    // Send event to analytics provider
    console.log('Event tracked:', event);
  }

  // Study-related events
  trackQuizStarted(quizId: number, subject: string): void {
    this.track('quiz_started', { quizId, subject });
  }

  trackQuizCompleted(quizId: number, subject: string, score: number, timeSpent: number): void {
    this.track('quiz_completed', { quizId, subject, score, timeSpent });
  }

  trackSummaryViewed(summaryId: number, subject: string): void {
    this.track('summary_viewed', { summaryId, subject });
  }

  trackStudySessionStarted(subject: string, duration: number): void {
    this.track('study_session_started', { subject, duration });
  }

  trackStudySessionCompleted(subject: string, duration: number, topicsCovered: string[]): void {
    this.track('study_session_completed', { subject, duration, topicsCovered });
  }

  // User engagement events
  trackScreenView(screenName: string): void {
    this.track('screen_view', { screenName });
  }

  trackFeatureUsed(featureName: string): void {
    this.track('feature_used', { featureName });
  }

  trackNotificationReceived(notificationType: string): void {
    this.track('notification_received', { notificationType });
  }

  trackNotificationOpened(notificationType: string): void {
    this.track('notification_opened', { notificationType });
  }

  // Error tracking
  trackError(error: Error, context?: Record<string, any>): void {
    this.track('error_occurred', {
      errorMessage: error.message,
      errorStack: error.stack,
      context,
    });
  }

  // Performance tracking
  trackPerformance(metric: string, value: number, unit: string = 'ms'): void {
    this.track('performance_metric', { metric, value, unit });
  }
}

export const analyticsService = new AnalyticsService(); 