import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { mockProgressData, mockAnalysisData } from '../data/mockData';
import { Card } from '../components/Card';

interface ProgressScreenProps {
  navigation: any;
}

export const ProgressScreen: React.FC<ProgressScreenProps> = ({ navigation }) => {
  const renderProgressCard = (title: string, value: number, subtitle: string) => (
    <Card style={styles.progressCard}>
      <Text style={styles.progressCardTitle}>{title}</Text>
      <Text style={styles.progressCardValue}>{value}%</Text>
      <Text style={styles.progressCardSubtitle}>{subtitle}</Text>
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${value}%` }]} />
      </View>
    </Card>
  );

  const renderSubjectCard = (subject: any) => (
    <Card key={subject.name} style={styles.subjectCard}>
      <View style={styles.subjectContent}>
        <Text style={styles.subjectName}>{subject.name}</Text>
        <Text style={styles.subjectScore}>{subject.score}%</Text>
      </View>
      <View style={styles.subjectProgressBar}>
        <View style={[styles.subjectProgressFill, { width: `${subject.score}%` }]} />
      </View>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Progresso</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Overall Progress */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Progresso Geral</Text>
          {renderProgressCard('Diário', mockProgressData.daily, 'Concluído hoje')}
          {renderProgressCard('Semanal', mockProgressData.weekly, 'Esta semana')}
          {renderProgressCard('Mensal', mockProgressData.monthly, 'Este mês')}
        </View>

        {/* Statistics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Estatísticas</Text>
          <Card style={styles.statsCard}>
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{mockAnalysisData.quizzesCompleted}</Text>
                <Text style={styles.statLabel}>Quizzes Concluídos</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{mockAnalysisData.summariesReviewed}</Text>
                <Text style={styles.statLabel}>Resumos Revisados</Text>
              </View>
            </View>
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{mockAnalysisData.averageScore}%</Text>
                <Text style={styles.statLabel}>Média de Acertos</Text>
              </View>
            </View>
          </Card>
        </View>

        {/* Subject Performance */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Performance por Matéria</Text>
          {mockAnalysisData.subjects.map(renderSubjectCard)}
        </View>
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
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
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginHorizontal: 16,
    marginBottom: 12,
    marginTop: 16,
  },
  progressCard: {
    marginHorizontal: 16,
    marginBottom: 12,
  },
  progressCardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  progressCardValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 4,
  },
  progressCardSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4A90E2',
    borderRadius: 3,
  },
  statsCard: {
    marginHorizontal: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  subjectCard: {
    marginHorizontal: 16,
    marginBottom: 8,
  },
  subjectContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  subjectName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  subjectScore: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  subjectProgressBar: {
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    overflow: 'hidden',
  },
  subjectProgressFill: {
    height: '100%',
    backgroundColor: '#4A90E2',
    borderRadius: 2,
  },
}); 