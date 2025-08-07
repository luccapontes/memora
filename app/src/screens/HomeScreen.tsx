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
import { Ionicons } from '@expo/vector-icons';
import { mockDailyActivities, mockProgressData, mockCalendarDays } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';
import { Card } from '../components/Card';

interface HomeScreenProps {
  navigation: any;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { user } = useAuth();

  const renderActivityCard = (activity: any) => (
    <TouchableOpacity key={activity.id} style={styles.activityCard}>
      <Image source={{ uri: activity.image }} style={styles.activityImage} />
      <View style={styles.activityContent}>
        <Text style={styles.activityTitle}>{activity.title}</Text>
        <Text style={styles.activityDescription}>{activity.description}</Text>
        <Text style={styles.activityTime}>{activity.time}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderCalendarDay = (day: any, index: number) => (
    <TouchableOpacity
      key={index}
      style={[
        styles.calendarDay,
        day.isToday && styles.calendarDayToday,
        day.hasActivity && styles.calendarDayHasActivity,
      ]}
    >
      <Text style={[styles.calendarDayText, day.isToday && styles.calendarDayTextToday]}>
        {day.date}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.appTitle}>Memora</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
          <Ionicons name="notifications-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Greeting */}
        <View style={styles.greeting}>
          <Text style={styles.greetingText}>Olá, {user?.name || 'Estudante'}!</Text>
          <Text style={styles.greetingSubtext}>Hoje é dia de Matemática</Text>
        </View>

        {/* Daily Activities */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Atividades do Dia</Text>
          {mockDailyActivities.map(renderActivityCard)}
        </View>

        {/* Daily Progress */}
        <Card style={styles.progressCard}>
          <Text style={styles.progressTitle}>Progresso diário</Text>
          <Text style={styles.progressPercentage}>{mockProgressData.daily}% concluído</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${mockProgressData.daily}%` }]} />
          </View>
        </Card>

        {/* Revision Calendar */}
        <Card style={styles.calendarCard}>
          <Text style={styles.calendarTitle}>Calendário de revisões</Text>
          <View style={styles.calendarHeader}>
            <TouchableOpacity>
              <Ionicons name="chevron-back" size={20} color="#000" />
            </TouchableOpacity>
            <Text style={styles.calendarMonth}>Julho 2024</Text>
            <TouchableOpacity>
              <Ionicons name="chevron-forward" size={20} color="#000" />
            </TouchableOpacity>
          </View>
          <View style={styles.calendarDaysHeader}>
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
              <Text key={index} style={styles.calendarDayHeader}>
                {day}
              </Text>
            ))}
          </View>
          <View style={styles.calendarGrid}>
            {mockCalendarDays.map(renderCalendarDay)}
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
  },
  appTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  content: {
    flex: 1,
  },
  greeting: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  greetingText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  greetingSubtext: {
    fontSize: 16,
    color: '#666',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginHorizontal: 16,
    marginBottom: 12,
  },
  activityCard: {
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  activityImage: {
    width: 60,
    height: 40,
    borderRadius: 8,
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  activityDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 12,
    color: '#999',
  },
  progressCard: {
    marginHorizontal: 16,
    marginBottom: 20,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  progressPercentage: {
    fontSize: 16,
    color: '#000',
    marginBottom: 12,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#000',
    borderRadius: 4,
  },
  calendarCard: {
    marginHorizontal: 16,
    marginBottom: 20,
  },
  calendarTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 16,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  calendarMonth: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  calendarDaysHeader: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  calendarDayHeader: {
    flex: 1,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 'bold',
    color: '#666',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  calendarDay: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarDayToday: {
    backgroundColor: '#4A90E2',
    borderRadius: 20,
  },
  calendarDayHasActivity: {
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
  },
  calendarDayText: {
    fontSize: 14,
    color: '#000',
  },
  calendarDayTextToday: {
    color: 'white',
    fontWeight: 'bold',
  },
}); 