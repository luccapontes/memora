import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
  Dimensions,
  StatusBar,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/Button';
import { LinearGradient } from 'expo-linear-gradient';

interface RegisterFormData {
  fullName: string;
  email: string;
  cpf: string;
  birthDate: string;
  class: string;
  password: string;
  confirmPassword: string;
}

const schema = yup.object({
  fullName: yup.string().required('Nome completo é obrigatório'),
  email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  cpf: yup.string().required('CPF é obrigatório'),
  birthDate: yup.string().required('Data de nascimento é obrigatória'),
  class: yup.string().required('Turma é obrigatória'),
  password: yup.string().min(6, 'Senha deve ter pelo menos 6 caracteres').required('Senha é obrigatória'),
  confirmPassword: yup.string().oneOf([yup.ref('password')], 'Senhas devem ser iguais').required('Confirmação de senha é obrigatória'),
});

interface RegisterScreenProps {
  navigation: any;
}

const { width, height } = Dimensions.get('window');

export const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const { register } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      const success = await register(data);
      if (success) {
        navigation.navigate('MainTabs');
      } else {
        Alert.alert('Erro', 'Ocorreu um erro ao criar a conta');
      }
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao criar a conta');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={['#667eea', '#764ba2']}
      style={styles.gradientContainer}
    >
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <View style={styles.logoBackground}>
              <Ionicons name="people" size={50} color="white" />
            </View>
            <Text style={styles.logoText}>Memora</Text>
            <Text style={styles.tagline}>Junte-se à nossa comunidade</Text>
          </View>
        </View>

        {/* Scrollable Content */}
        <ScrollView 
          style={styles.scrollContainer} 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Form Card */}
          <View style={styles.formCard}>
            <Text style={styles.formTitle}>Bem-vindo ao Memora!</Text>
            <Text style={styles.formSubtitle}>
              Para começar, precisamos de algumas informações suas.
            </Text>

            <View style={styles.formContainer}>
              <Controller
                control={control}
                name="fullName"
                render={({ field: { onChange, onBlur, value } }) => (
                  <View style={styles.inputContainer}>
                    <View style={styles.inputWrapper}>
                      <Ionicons name="person-outline" size={22} color="#667eea" style={styles.inputIcon} />
                      <TextInput
                        style={styles.input}
                        placeholder="Nome completo"
                        placeholderTextColor="#999"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                      />
                    </View>
                    {errors.fullName && <Text style={styles.errorText}>{errors.fullName.message}</Text>}
                  </View>
                )}
              />

              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <View style={styles.inputContainer}>
                    <View style={styles.inputWrapper}>
                      <Ionicons name="mail-outline" size={22} color="#667eea" style={styles.inputIcon} />
                      <TextInput
                        style={styles.input}
                        placeholder="E-mail escolar"
                        placeholderTextColor="#999"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                      />
                    </View>
                    {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}
                  </View>
                )}
              />

              <Controller
                control={control}
                name="cpf"
                render={({ field: { onChange, onBlur, value } }) => (
                  <View style={styles.inputContainer}>
                    <View style={styles.inputWrapper}>
                      <Ionicons name="card-outline" size={22} color="#667eea" style={styles.inputIcon} />
                      <TextInput
                        style={styles.input}
                        placeholder="CPF"
                        placeholderTextColor="#999"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        keyboardType="numeric"
                      />
                    </View>
                    {errors.cpf && <Text style={styles.errorText}>{errors.cpf.message}</Text>}
                  </View>
                )}
              />

              <Controller
                control={control}
                name="birthDate"
                render={({ field: { onChange, onBlur, value } }) => (
                  <View style={styles.inputContainer}>
                    <View style={styles.inputWrapper}>
                      <Ionicons name="calendar-outline" size={22} color="#667eea" style={styles.inputIcon} />
                      <TextInput
                        style={styles.input}
                        placeholder="Data de nascimento"
                        placeholderTextColor="#999"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                      />
                    </View>
                    {errors.birthDate && <Text style={styles.errorText}>{errors.birthDate.message}</Text>}
                  </View>
                )}
              />

              <Controller
                control={control}
                name="class"
                render={({ field: { onChange, onBlur, value } }) => (
                  <View style={styles.inputContainer}>
                    <View style={styles.inputWrapper}>
                      <Ionicons name="school-outline" size={22} color="#667eea" style={styles.inputIcon} />
                      <TextInput
                        style={styles.input}
                        placeholder="Turma"
                        placeholderTextColor="#999"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                      />
                    </View>
                    {errors.class && <Text style={styles.errorText}>{errors.class.message}</Text>}
                  </View>
                )}
              />

              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <View style={styles.inputContainer}>
                    <View style={styles.inputWrapper}>
                      <Ionicons name="lock-closed-outline" size={22} color="#667eea" style={styles.inputIcon} />
                      <TextInput
                        style={styles.input}
                        placeholder="Senha"
                        placeholderTextColor="#999"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        secureTextEntry
                        autoCapitalize="none"
                      />
                    </View>
                    {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
                  </View>
                )}
              />

              <Controller
                control={control}
                name="confirmPassword"
                render={({ field: { onChange, onBlur, value } }) => (
                  <View style={styles.inputContainer}>
                    <View style={styles.inputWrapper}>
                      <Ionicons name="lock-closed-outline" size={22} color="#667eea" style={styles.inputIcon} />
                      <TextInput
                        style={styles.input}
                        placeholder="Confirmar senha"
                        placeholderTextColor="#999"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        secureTextEntry
                        autoCapitalize="none"
                      />
                    </View>
                    {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>}
                  </View>
                )}
              />
            </View>
          </View>

          {/* Action Section */}
          <View style={styles.actionSection}>
            <Button
              title={isLoading ? 'Criando conta...' : 'Criar conta'}
              onPress={handleSubmit(onSubmit)}
              disabled={isLoading}
              style={styles.button}
            />

            <TouchableOpacity
              onPress={() => navigation.navigate('Login')}
              style={styles.loginLink}
            >
              <Text style={styles.loginText}>
                Já tem uma conta? <Text style={styles.loginTextBold}>Faça login</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingTop: height * 0.06,
    paddingBottom: height * 0.04,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoBackground: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  logoText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  tagline: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  formCard: {
    backgroundColor: 'white',
    marginHorizontal: 24,
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 15,
    marginBottom: 20,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  formSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  formContainer: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputIcon: {
    marginRight: 16,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: 13,
    marginTop: 6,
    marginLeft: 4,
    fontWeight: '500',
  },
  actionSection: {
    marginHorizontal: 24,
    marginBottom: 20,
  },
  button: {
    width: '100%',
    marginBottom: 20,
  },
  loginLink: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  loginText: {
    fontSize: 15,
    color: '#666',
  },
  loginTextBold: {
    color: '#667eea',
    fontWeight: 'bold',
  },
}); 