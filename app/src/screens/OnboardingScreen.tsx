import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { Button } from '../components/Button';

const { width, height } = Dimensions.get('window');

interface OnboardingScreenProps {
  navigation: any;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Decorative Background */}
      <View style={styles.decorativeBackground}>
        <View style={styles.shape1} />
        <View style={styles.shape2} />
        <View style={styles.shape3} />
        <View style={styles.shape4} />
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.title}>Study, memorize, evolve!</Text>
        <Text style={styles.description}>
          Our app helps you remember what you've learned, so you can achieve your academic goals.
        </Text>

        {/* Pagination Dots */}
        <View style={styles.pagination}>
          <View style={styles.dotActive} />
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>

        {/* Get Started Button */}
        <View style={styles.buttonContainer}>
          <Button
            title="Get Started"
            onPress={() => navigation.navigate('Login')}
            style={styles.button}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  decorativeBackground: {
    height: height * 0.4,
    backgroundColor: '#FFE4E1',
    position: 'relative',
    overflow: 'hidden',
  },
  shape1: {
    position: 'absolute',
    top: 50,
    left: -50,
    width: 200,
    height: 200,
    backgroundColor: '#2F4F4F',
    borderRadius: 100,
    transform: [{ scaleX: 1.5 }, { scaleY: 0.8 }],
  },
  shape2: {
    position: 'absolute',
    top: 20,
    right: -30,
    width: 150,
    height: 150,
    backgroundColor: '#FFA500',
    borderRadius: 75,
  },
  shape3: {
    position: 'absolute',
    top: 80,
    right: 50,
    width: 80,
    height: 80,
    backgroundColor: '#FFD700',
    borderRadius: 40,
  },
  shape4: {
    position: 'absolute',
    top: 30,
    left: 50,
    width: 60,
    height: 60,
    backgroundColor: '#FFA500',
    borderRadius: 30,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'left',
    lineHeight: 24,
    marginBottom: 40,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#DDD',
    marginHorizontal: 4,
  },
  dotActive: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#000',
    marginHorizontal: 4,
  },
  buttonContainer: {
    marginBottom: 40,
  },
  button: {
    width: '100%',
  },
}); 