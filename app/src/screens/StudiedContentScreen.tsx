import React, { useState } from 'react';
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
import { Card } from '../components/Card';
import { mockSummaries, mockQuizzes } from '../data/mockData';

interface StudiedContentScreenProps {
  navigation: any;
}

export const StudiedContentScreen: React.FC<StudiedContentScreenProps> = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState<'summaries' | 'quizzes'>('summaries');

  const renderSummaryItem = (summary: any) => (
    <Card key={summary.id} style={styles.contentItem}>
      <View style={styles.contentHeader}>
        <Image source={{ uri: summary.image }} style={styles.contentImage} />
        <View style={styles.contentInfo}>
          <Text style={styles.contentSubject}>{summary.subject}</Text>
          <Text style={styles.contentTitle}>{summary.title}</Text>
          <Text style={styles.contentDate}>{summary.date}</Text>
        </View>
        <Ionicons name="checkmark-circle" size={24} color="#50C878" />
      </View>
    </Card>
  );

  const renderQuizItem = (quiz: any) => (
    <Card key={quiz.id} style={styles.contentItem}>
      <View style={styles.contentHeader}>
        <View style={styles.quizIcon}>
          <Ionicons name="help-circle-outline" size={24} color="#4A90E2" />
        </View>
        <View style={styles.contentInfo}>
          <Text style={styles.contentSubject}>{quiz.subject}</Text>
          <Text style={styles.contentTitle}>{quiz.question}</Text>
          <Text style={styles.contentDate}>Concluído em 05/07/2024</Text>
        </View>
        <View style={styles.quizScore}>
          <Text style={styles.quizScoreText}>80%</Text>
        </View>
      </View>
    </Card>
  );

  const renderFilterChip = (label: string, isActive: boolean, onPress: () => void) => (
    <TouchableOpacity
      style={[styles.filterChip, isActive && styles.filterChipActive]}
      onPress={onPress}
    >
      <Text style={[styles.filterChipText, isActive && styles.filterChipTextActive]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Conteúdos Estudados</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'summaries' && styles.tabActive]}
          onPress={() => setSelectedTab('summaries')}
        >
          <Ionicons
            name="book-outline"
            size={20}
            color={selectedTab === 'summaries' ? '#4A90E2' : '#666'}
          />
          <Text style={[styles.tabText, selectedTab === 'summaries' && styles.tabTextActive]}>
            Resumos
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'quizzes' && styles.tabActive]}
          onPress={() => setSelectedTab('quizzes')}
        >
          <Ionicons
            name="help-circle-outline"
            size={20}
            color={selectedTab === 'quizzes' ? '#4A90E2' : '#666'}
          />
          <Text style={[styles.tabText, selectedTab === 'quizzes' && styles.tabTextActive]}>
            Quizzes
          </Text>
        </TouchableOpacity>
      </View>

      {/* Filters */}
      <View style={styles.filtersContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {renderFilterChip('Todos', true, () => {})}
          {renderFilterChip('Matemática', false, () => {})}
          {renderFilterChip('Português', false, () => {})}
          {renderFilterChip('História', false, () => {})}
          {renderFilterChip('Geografia', false, () => {})}
        </ScrollView>
      </View>

      {/* Content List */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {selectedTab === 'summaries' ? (
          <View>
            <View style={styles.sectionHeader}>
              <Ionicons name="book-outline" size={20} color="#4A90E2" />
              <Text style={styles.sectionTitle}>Resumos Revisados</Text>
            </View>
            {mockSummaries.map(renderSummaryItem)}
          </View>
        ) : (
          <View>
            <View style={styles.sectionHeader}>
              <Ionicons name="help-circle-outline" size={20} color="#4A90E2" />
              <Text style={styles.sectionTitle}>Quizzes Concluídos</Text>
            </View>
            {mockQuizzes.map(renderQuizItem)}
          </View>
        )}

        {/* Statistics */}
        <Card style={styles.statsCard}>
          <View style={styles.statsHeader}>
            <Ionicons name="stats-chart-outline" size={20} color="#4A90E2" />
            <Text style={styles.statsTitle}>Estatísticas</Text>
          </View>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>
                {selectedTab === 'summaries' ? mockSummaries.length : mockQuizzes.length}
              </Text>
              <Text style={styles.statLabel}>
                {selectedTab === 'summaries' ? 'Resumos' : 'Quizzes'}
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>
                {selectedTab === 'summaries' ? '85%' : '78%'}
              </Text>
              <Text style={styles.statLabel}>Média de Acertos</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>
                {selectedTab === 'summaries' ? '12h' : '8h'}
              </Text>
              <Text style={styles.statLabel}>Tempo Total</Text>
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
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
  },
  tabActive: {
    backgroundColor: '#F0F8FF',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  tabTextActive: {
    color: '#4A90E2',
    fontWeight: 'bold',
  },
  filtersContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  filterChip: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  filterChipActive: {
    backgroundColor: '#4A90E2',
  },
  filterChipText: {
    fontSize: 14,
    color: '#666',
  },
  filterChipTextActive: {
    color: 'white',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 8,
  },
  contentItem: {
    marginBottom: 12,
  },
  contentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  quizIcon: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#F0F8FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  contentInfo: {
    flex: 1,
  },
  contentSubject: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  contentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  contentDate: {
    fontSize: 12,
    color: '#999',
  },
  quizScore: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  quizScoreText: {
    fontSize: 12,
    color: 'white',
    fontWeight: 'bold',
  },
  statsCard: {
    marginTop: 16,
    marginBottom: 16,
  },
  statsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  statsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 8,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
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
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
}); 