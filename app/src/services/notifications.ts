import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

// Configure notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

class NotificationService {
  private expoPushToken: string | null = null;

  async registerForPushNotificationsAsync(): Promise<string | null> {
    let token;

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      
      if (finalStatus !== 'granted') {
        console.log('Failed to get push token for push notification!');
        return null;
      }
      
      token = (await Notifications.getExpoPushTokenAsync({
        projectId: process.env.EXPO_PROJECT_ID,
      })).data;
    } else {
      console.log('Must use physical device for Push Notifications');
    }

    this.expoPushToken = token || null;
    return token || null;
  }

  async scheduleLocalNotification(
    title: string,
    body: string,
    trigger?: Notifications.NotificationTriggerInput
  ): Promise<string> {
    const identifier = await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        sound: true,
      },
      trigger: trigger || null,
    });
    
    return identifier;
  }

  async cancelNotification(identifier: string): Promise<void> {
    await Notifications.cancelScheduledNotificationAsync(identifier);
  }

  async cancelAllNotifications(): Promise<void> {
    await Notifications.cancelAllScheduledNotificationsAsync();
  }

  async getBadgeCountAsync(): Promise<number> {
    return await Notifications.getBadgeCountAsync();
  }

  async setBadgeCountAsync(count: number): Promise<void> {
    await Notifications.setBadgeCountAsync(count);
  }

  // Schedule study reminders
  async scheduleStudyReminder(
    subject: string,
    time: Date,
    repeat: 'daily' | 'weekly' | null = null
  ): Promise<string> {
    const trigger: Notifications.NotificationTriggerInput = {
      date: time,
      ...(repeat && {
        repeats: true,
        seconds: repeat === 'daily' ? 24 * 60 * 60 : 7 * 24 * 60 * 60,
      }),
    };

    return this.scheduleLocalNotification(
      'Hora de estudar! 📚',
      `Que tal revisar ${subject} agora?`,
      trigger
    );
  }

  // Schedule quiz reminders
  async scheduleQuizReminder(
    subject: string,
    time: Date
  ): Promise<string> {
    return this.scheduleLocalNotification(
      'Quiz disponível! 🎯',
      `Teste seus conhecimentos em ${subject}`,
      { date: time }
    );
  }

  getExpoPushToken(): string | null {
    return this.expoPushToken;
  }
}

export const notificationService = new NotificationService(); 