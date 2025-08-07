import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import { mockSummaries } from '../data/mockData';
import { Card } from '../components/Card';

interface SummariesScreenProps {
  navigation: any;
}

export const SummariesScreen: React.FC<SummariesScreenProps> = ({ navigation }) => {
  const [selectedSubject, setSelectedSubject] = useState('Todas');
  const [searchText, setSearchText] = useState('');

  const subjects = ['Todas', 'Matemática', 'Português', 'História', 'Geografia', 'Biologia'];

  const filteredSummaries = mockSummaries.filter(summary => {
    const matchesSubject = selectedSubject === 'Todas' || summary.subject === selectedSubject;
    const matchesSearch = summary.title.toLowerCase().includes(searchText.toLowerCase()) ||
                         summary.description.toLowerCase().includes(searchText.toLowerCase());
    return matchesSubject && matchesSearch;
  });

  const renderSummaryCard = (summary: any) => (
    <Card key={summary.id} style={styles.summaryCard}>
      <View style={styles.summaryContent}>
        <View style={styles.summaryText}>
          <Text style={styles.summarySubject}>{summary.subject}</Text>
          <Text style={styles.summaryTitle}>{summary.title}</Text>
          <Text style={styles.summaryDescription} numberOfLines={3}>
            {summary.description}
          </Text>
          <TouchableOpacity style={styles.seeMoreButton}>
            <Text style={styles.seeMoreText}>Ver mais</Text>
          </TouchableOpacity>
        </View>
        <Image source={{ uri: summary.image }} style={styles.summaryImage} />
      </View>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Resumos</Text>
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.searchIcon}>🔍</Text>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar resumos..."
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* Subject Filters */}
      <View style={styles.filtersContainer}>
        <Text style={styles.filtersTitle}>Matérias</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersScroll}>
          {subjects.map((subject) => (
            <TouchableOpacity
              key={subject}
              style={[
                styles.filterButton,
                selectedSubject === subject && styles.filterButtonActive,
              ]}
              onPress={() => setSelectedSubject(subject)}
            >
              <Text style={[
                styles.filterButtonText,
                selectedSubject === subject && styles.filterButtonTextActive,
              ]}>
                {subject}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Summaries List */}
      <ScrollView style={styles.summariesList} showsVerticalScrollIndicator={false}>
        {filteredSummaries.map(renderSummaryCard)}
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
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  searchIcon: {
    fontSize: 20,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
  },
  searchInput: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
  filtersContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
  },
  filtersTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  filtersScroll: {
    flexDirection: 'row',
  },
  filterButton: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  filterButtonActive: {
    backgroundColor: '#4A90E2',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#666',
  },
  filterButtonTextActive: {
    color: 'white',
    fontWeight: 'bold',
  },
  summariesList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  summaryCard: {
    marginBottom: 12,
  },
  summaryContent: {
    flexDirection: 'row',
  },
  summaryText: {
    flex: 1,
    marginRight: 12,
  },
  summarySubject: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  summaryDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  seeMoreButton: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  seeMoreText: {
    fontSize: 14,
    color: '#666',
  },
  summaryImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
}); 