import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../components/Card';
import { mockAnalysisData } from '../data/mockData';

const { width } = Dimensions.get('window');

interface GeneralAnalysisScreenProps {
  navigation: any;
}

export const GeneralAnalysisScreen: React.FC<GeneralAnalysisScreenProps> = ({ navigation }) => {
  const renderProgressBar = (percentage: number, color: string) => (
    <View style={styles.progressBarContainer}>
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${percentage}%`, backgroundColor: color }]} />
      </View>
      <Text style={styles.progressText}>{percentage}%</Text>
    </View>
  );

  const renderSubjectCard = (subject: any) => (
    <Card key={subject.name} style={styles.subjectCard}>
      <View style={styles.subjectHeader}>
        <Text style={styles.subjectName}>{subject.name}</Text>
        <Text style={styles.subjectScore}>{subject.score}%</Text>
      </View>
      {renderProgressBar(subject.score, '#4A90E2')}
    </Card>
  );

  const renderChartCard = (title: string, data: any[], color: string) => (
    <Card style={styles.chartCard}>
      <View style={styles.chartHeader}>
        <Ionicons name="bar-chart-outline" size={20} color={color} />
        <Text style={styles.chartTitle}>{title}</Text>
      </View>
      <View style={styles.chartContent}>
        {data.map((item, index) => (
          <View key={index} style={styles.chartItem}>
            <View style={styles.chartItemHeader}>
              <Text style={styles.chartItemLabel}>{item.label}</Text>
              <Text style={styles.chartItemValue}>{item.value}</Text>
            </View>
            <View style={styles.chartBar}>
              <View style={[styles.chartBarFill, { width: `${item.percentage}%`, backgroundColor: color }]} />
            </View>
          </View>
        ))}
      </View>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Análise Geral</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Overall Performance */}
        <Card style={styles.overallCard}>
          <View style={styles.overallHeader}>
            <Ionicons name="trophy-outline" size={24} color="#FFD700" />
            <Text style={styles.overallTitle}>Performance Geral</Text>
          </View>
          <View style={styles.overallStats}>
            <View style={styles.overallStat}>
              <Text style={styles.overallStatValue}>{mockAnalysisData.averageScore}%</Text>
              <Text style={styles.overallStatLabel}>Média Geral</Text>
            </View>
            <View style={styles.overallStat}>
              <Text style={styles.overallStatValue}>{mockAnalysisData.quizzesCompleted}</Text>
              <Text style={styles.overallStatLabel}>Quizzes</Text>
            </View>
            <View style={styles.overallStat}>
              <Text style={styles.overallStatValue}>{mockAnalysisData.summariesReviewed}</Text>
              <Text style={styles.overallStatLabel}>Resumos</Text>
            </View>
          </View>
        </Card>

        {/* Subject Performance */}
        <Card style={styles.subjectsCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="book-outline" size={20} color="#4A90E2" />
            <Text style={styles.sectionTitle}>Performance por Matéria</Text>
          </View>
          {mockAnalysisData.subjects.map(renderSubjectCard)}
        </Card>

        {/* Weekly Progress */}
        <Card style={styles.weeklyCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="calendar-outline" size={20} color="#50C878" />
            <Text style={styles.sectionTitle}>Progresso Semanal</Text>
          </View>
          <View style={styles.weeklyGrid}>
            {[
              { day: 'Seg', progress: 80 },
              { day: 'Ter', progress: 65 },
              { day: 'Qua', progress: 90 },
              { day: 'Qui', progress: 75 },
              { day: 'Sex', progress: 85 },
              { day: 'Sáb', progress: 60 },
              { day: 'Dom', progress: 45 },
            ].map((item, index) => (
              <View key={index} style={styles.weeklyItem}>
                <Text style={styles.weeklyDay}>{item.day}</Text>
                <View style={styles.weeklyBar}>
                  <View style={[styles.weeklyBarFill, { height: `${item.progress}%` }]} />
                </View>
                <Text style={styles.weeklyProgress}>{item.progress}%</Text>
              </View>
            ))}
          </View>
        </Card>

        {/* Learning Trends */}
        <Card style={styles.trendsCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="trending-up-outline" size={20} color="#FF6B6B" />
            <Text style={styles.sectionTitle}>Tendências de Aprendizado</Text>
          </View>
          {renderChartCard('Tempo de Estudo (horas)', [
            { label: 'Matemática', value: '12h', percentage: 60 },
            { label: 'Português', value: '8h', percentage: 40 },
            { label: 'História', value: '6h', percentage: 30 },
            { label: 'Geografia', value: '4h', percentage: 20 },
          ], '#FF6B6B')}
        </Card>

        {/* Recommendations */}
        <Card style={styles.recommendationsCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="bulb-outline" size={20} color="#FFA500" />
            <Text style={styles.sectionTitle}>Recomendações</Text>
          </View>
          <View style={styles.recommendationsList}>
            <View style={styles.recommendationItem}>
              <Ionicons name="checkmark-circle" size={16} color="#50C878" />
              <Text style={styles.recommendationText}>Foque mais em Geografia - sua performance está abaixo da média</Text>
            </View>
            <View style={styles.recommendationItem}>
              <Ionicons name="checkmark-circle" size={16} color="#50C878" />
              <Text style={styles.recommendationText}>Continue com Matemática - excelente progresso!</Text>
            </View>
            <View style={styles.recommendationItem}>
              <Ionicons name="checkmark-circle" size={16} color="#50C878" />
              <Text style={styles.recommendationText}>Revise os resumos de História para melhorar a retenção</Text>
            </View>
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
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  overallCard: {
    marginTop: 16,
    marginBottom: 16,
  },
  overallHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  overallTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 8,
  },
  overallStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  overallStat: {
    alignItems: 'center',
  },
  overallStatValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 4,
  },
  overallStatLabel: {
    fontSize: 12,
    color: '#666',
  },
  subjectsCard: {
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 8,
  },
  subjectCard: {
    marginBottom: 8,
  },
  subjectHeader: {
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
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    marginRight: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: '#666',
    minWidth: 30,
  },
  weeklyCard: {
    marginBottom: 16,
  },
  weeklyGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 120,
  },
  weeklyItem: {
    alignItems: 'center',
    flex: 1,
  },
  weeklyDay: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  weeklyBar: {
    width: 20,
    height: 80,
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 4,
  },
  weeklyBarFill: {
    backgroundColor: '#4A90E2',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: 10,
  },
  weeklyProgress: {
    fontSize: 10,
    color: '#666',
  },
  trendsCard: {
    marginBottom: 16,
  },
  chartCard: {
    marginBottom: 16,
  },
  chartHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 8,
  },
  chartContent: {
    gap: 12,
  },
  chartItem: {
    marginBottom: 8,
  },
  chartItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  chartItemLabel: {
    fontSize: 14,
    color: '#000',
  },
  chartItemValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
  },
  chartBar: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  chartBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  recommendationsCard: {
    marginBottom: 16,
  },
  recommendationsList: {
    gap: 8,
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  recommendationText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
    flex: 1,
    lineHeight: 20,
  },
}); 