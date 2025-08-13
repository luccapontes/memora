import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import { Button } from '../components/Button';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

interface OnboardingScreenProps {
  navigation: any;
}

interface Slide {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: 'Estude, memorize, evolua!',
    description: 'Nosso app ajuda você a lembrar o que aprendeu, para que possa alcançar seus objetivos acadêmicos.',
    icon: 'school',
    color: '#4A90E2'
  },
  {
    id: 2,
    title: 'Resumos Inteligentes',
    description: 'Crie e revise resumos concisos das suas aulas para reforçar o aprendizado.',
    icon: 'book',
    color: '#50C878'
  },
  {
    id: 3,
    title: 'Quizzes Interativos',
    description: 'Teste seus conhecimentos com quizzes personalizados que se adaptam ao seu progresso.',
    icon: 'help-circle',
    color: '#FF6B6B'
  },
  {
    id: 4,
    title: 'Acompanhe o Progresso',
    description: 'Monitore sua jornada de aprendizado com análises detalhadas e insights.',
    icon: 'stats-chart',
    color: '#FFA500'
  }
];

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const renderSlide = ({ item }: { item: Slide }) => (
    <View style={[styles.slide, { width }]}>
      {/* Icon Container */}
      <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
        <Ionicons name={item.icon as any} size={80} color="white" />
      </View>

      {/* Content */}
      <View style={styles.slideContent}>
        <Text style={styles.slideTitle}>{item.title}</Text>
        <Text style={styles.slideDescription}>{item.description}</Text>
      </View>
    </View>
  );

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      flatListRef.current?.scrollToIndex({ 
        index: nextIndex, 
        animated: true,
        viewPosition: 0.5
      });
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      flatListRef.current?.scrollToIndex({ 
        index: prevIndex, 
        animated: true,
        viewPosition: 0.5
      });
    }
  };

  const handleSkip = () => {
    navigation.navigate('Login');
  };

  const handleGetStarted = () => {
    navigation.navigate('Login');
  };

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      const newIndex = viewableItems[0].index;
      if (newIndex !== currentIndex) {
        setCurrentIndex(newIndex);
      }
    }
  }).current;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with Skip Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
          <Text style={styles.skipText}>Pular</Text>
        </TouchableOpacity>
      </View>

      {/* Slides */}
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderSlide}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ 
          itemVisiblePercentThreshold: 50,
          minimumViewTime: 100
        }}
        decelerationRate="normal"
        snapToInterval={width}
        snapToAlignment="center"
        contentContainerStyle={styles.slidesContainer}
        getItemLayout={(data, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
      />

      {/* Navigation Controls */}
      <View style={styles.navigationContainer}>
        {/* Pagination Dots */}
        <View style={styles.pagination}>
          {slides.map((_, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setCurrentIndex(index);
                flatListRef.current?.scrollToIndex({ 
                  index, 
                  animated: true,
                  viewPosition: 0.5
                });
              }}
              style={styles.dotContainer}
            >
              <View
                style={[
                  styles.dot,
                  index === currentIndex && styles.dotActive
                ]}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Navigation Buttons */}
        <View style={styles.navigationButtons}>
          {currentIndex > 0 && (
            <TouchableOpacity onPress={handlePrevious} style={styles.navButton}>
              <Ionicons name="chevron-back" size={24} color="#666" />
            </TouchableOpacity>
          )}

          {currentIndex < slides.length - 1 ? (
            <TouchableOpacity onPress={handleNext} style={styles.navButton}>
              <Ionicons name="chevron-forward" size={24} color="#666" />
            </TouchableOpacity>
          ) : (
            <View style={styles.navButton} />
          )}
        </View>
      </View>

      {/* Get Started Button - Integrated Design */}
      {currentIndex === slides.length - 1 && (
        <View style={styles.buttonContainer}>
          <Button
            title="Começar"
            onPress={handleGetStarted}
            style={styles.button}
          />
          <Text style={styles.buttonSubtitle}>
            Clique para começar sua jornada de aprendizado
          </Text>
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
    justifyContent: 'flex-end',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 10,
  },
  skipButton: {
    padding: 8,
  },
  skipText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    opacity: 1,
  },
  iconContainer: {
    width: 160,
    height: 160,
    borderRadius: 80,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    transform: [{ scale: 1 }],
  },
  slideContent: {
    alignItems: 'center',
    maxWidth: 300,
  },
  slideTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 34,
  },
  slideDescription: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  navigationContainer: {
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  dotContainer: {
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#DDD',
    marginHorizontal: 0,
  },
  dotActive: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4A90E2',
    marginHorizontal: 0,
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  navButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonContainer: {
    marginBottom: 20,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  button: {
    width: '100%',
    marginBottom: 12,
  },
  buttonSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
    opacity: 0.8,
  },
  slidesContainer: {
    alignItems: 'center',
    flexGrow: 1,
  },
}); 