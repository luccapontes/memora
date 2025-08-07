import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { mockQuizzes } from '../data/mockData';
import { Button } from '../components/Button';

interface QuizScreenProps {
  navigation: any;
}

export const QuizScreen: React.FC<QuizScreenProps> = ({ navigation }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const currentQuestion = mockQuizzes[currentQuestionIndex];
  const totalQuestions = mockQuizzes.length;

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleVerify = () => {
    if (selectedAnswer === null) return;

    if (selectedAnswer === currentQuestion.correct) {
      setScore(score + 1);
    }

    if (currentQuestionIndex + 1 < totalQuestions) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setQuizCompleted(false);
  };

  const renderQuestion = () => (
    <View style={styles.questionContainer}>
      <Text style={styles.questionText}>{currentQuestion.question}</Text>
      
      <View style={styles.answersContainer}>
        {currentQuestion.alternatives.map((alternative, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.answerOption,
              selectedAnswer === index && styles.answerOptionSelected,
            ]}
            onPress={() => handleAnswerSelect(index)}
          >
            <View style={[
              styles.radioButton,
              selectedAnswer === index && styles.radioButtonSelected,
            ]} />
            <Text style={[
              styles.answerText,
              selectedAnswer === index && styles.answerTextSelected,
            ]}>
              {alternative}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderResults = () => (
    <View style={styles.resultsContainer}>
      <Text style={styles.resultsTitle}>Quiz Concluído!</Text>
      <Text style={styles.resultsScore}>
        Você acertou {score} de {totalQuestions} questões
      </Text>
      <Text style={styles.resultsPercentage}>
        {Math.round((score / totalQuestions) * 100)}% de acerto
      </Text>
      
      <View style={styles.resultsButtons}>
        <Button title="Reiniciar Quiz" onPress={handleRestart} style={styles.restartButton} />
        <Button title="Voltar ao Início" onPress={() => navigation.navigate('Home')} style={styles.homeButton} />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.closeButton}>✕</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Quiz</Text>
        <View style={{ width: 20 }} />
      </View>

      {!quizCompleted ? (
        <>
          {/* Progress */}
          <View style={styles.progressContainer}>
            <Text style={styles.progressText}>
              Questão {currentQuestionIndex + 1} de {totalQuestions}
            </Text>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }
                ]} 
              />
            </View>
          </View>

          {/* Question */}
          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {renderQuestion()}
          </ScrollView>

          {/* Verify Button */}
          <View style={styles.buttonContainer}>
            <Button
              title="Verificar"
              onPress={handleVerify}
              disabled={selectedAnswer === null}
              style={styles.verifyButton}
            />
          </View>
        </>
      ) : (
        <View style={styles.content}>
          {renderResults()}
        </View>
      )}
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
  closeButton: {
    fontSize: 20,
    color: '#000',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  progressContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  progressText: {
    fontSize: 16,
    color: '#000',
    marginBottom: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#000',
    borderRadius: 2,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  questionContainer: {
    paddingVertical: 24,
  },
  questionText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 32,
    lineHeight: 28,
  },
  answersContainer: {
    gap: 12,
  },
  answerOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  answerOptionSelected: {
    borderColor: '#4A90E2',
    backgroundColor: '#F0F8FF',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    marginRight: 12,
  },
  radioButtonSelected: {
    borderColor: '#4A90E2',
    backgroundColor: '#4A90E2',
  },
  answerText: {
    fontSize: 16,
    color: '#000',
  },
  answerTextSelected: {
    fontWeight: 'bold',
  },
  buttonContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  verifyButton: {
    width: '100%',
  },
  resultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  resultsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 16,
  },
  resultsScore: {
    fontSize: 18,
    color: '#666',
    marginBottom: 8,
  },
  resultsPercentage: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 32,
  },
  resultsButtons: {
    width: '100%',
    gap: 12,
  },
  restartButton: {
    backgroundColor: '#4A90E2',
  },
  homeButton: {
    backgroundColor: '#666',
  },
}); 