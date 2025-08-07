import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { mockNotifications } from '../data/mockData';

interface NotificationsScreenProps {
  navigation: any;
}

export const NotificationsScreen: React.FC<NotificationsScreenProps> = ({ navigation }) => {
  const scheduledNotifications = mockNotifications.filter(n => n.type === 'scheduled');
  const receivedNotifications = mockNotifications.filter(n => n.type === 'received');

  const renderNotification = (notification: any) => (
    <View key={notification.id} style={styles.notificationItem}>
      <View style={styles.notificationContent}>
        <View style={styles.notificationText}>
          <Text style={styles.notificationTitle}>
            {notification.emoji} {notification.title}
          </Text>
          <Text style={styles.notificationDescription}>
            {notification.description}
          </Text>
          <Text style={styles.notificationTime}>{notification.time}</Text>
        </View>
        <Image source={{ uri: notification.image }} style={styles.notificationImage} />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notificações</Text>
        <View style={{ width: 20 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Today Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hoje</Text>

          {/* Scheduled Notifications */}
          {scheduledNotifications.length > 0 && (
            <View style={styles.notificationGroup}>
              <Text style={styles.groupTitle}>Agendado</Text>
              {scheduledNotifications.map(renderNotification)}
            </View>
          )}

          {/* Received Notifications */}
          {receivedNotifications.length > 0 && (
            <View style={styles.notificationGroup}>
              <Text style={styles.groupTitle}>Recebido</Text>
              {receivedNotifications.map(renderNotification)}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    fontSize: 24,
    color: '#000',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  content: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 16,
  },
  notificationGroup: {
    marginBottom: 24,
  },
  groupTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  notificationItem: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  notificationContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationText: {
    flex: 1,
    marginRight: 12,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  notificationDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  notificationTime: {
    fontSize: 12,
    color: '#999',
  },
  notificationImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
}); 