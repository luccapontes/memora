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
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/Button';

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
    <SafeAreaView style={styles.container}>
      {/* Header with Illustration */}
      <View style={styles.header}>
        <View style={styles.illustration}>
          <View style={styles.illustrationPlaceholder}>
            <Ionicons name="people" size={48} color="white" />
          </View>
        </View>
      </View>

      {/* Form */}
      <ScrollView style={styles.formContainer} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Bem-vindo ao Memora!</Text>
        <Text style={styles.subtitle}>
          Para começar, precisamos de algumas informações suas.
        </Text>

        <Controller
          control={control}
          name="fullName"
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <Ionicons name="person-outline" size={20} color="#666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Nome completo"
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
                <Ionicons name="mail-outline" size={20} color="#666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="E-mail escolar"
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
                <Ionicons name="card-outline" size={20} color="#666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="CPF"
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
                <Ionicons name="calendar-outline" size={20} color="#666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Data de nascimento"
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
                <Ionicons name="school-outline" size={20} color="#666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Turma"
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
                <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Senha"
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
                <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Confirmar senha"
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

        <View style={styles.buttonContainer}>
          <Button
            title={isLoading ? 'Criando conta...' : 'Próximo'}
            onPress={handleSubmit(onSubmit)}
            disabled={isLoading}
            style={styles.button}
          />
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          style={styles.loginLink}
        >
          <Text style={styles.loginText}>
            Já tem uma conta? <Text style={styles.loginTextBold}>Faça login</Text>
          </Text>
        </TouchableOpacity>
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
    height: 200,
    backgroundColor: '#2F4F4F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustration: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustrationPlaceholder: {
    width: 120,
    height: 120,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  buttonContainer: {
    marginTop: 24,
    marginBottom: 20,
  },
  button: {
    width: '100%',
  },
  loginLink: {
    alignItems: 'center',
    marginBottom: 40,
  },
  loginText: {
    fontSize: 14,
    color: '#666',
  },
  loginTextBold: {
    color: '#4A90E2',
    fontWeight: 'bold',
  },
}); 