import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  StyleSheet,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { setData as setLoginData } from '../../store/reducer/NextScreenReducer';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CApi from '@/lib/CApi';

// Define the type for API response
interface LoginResponse {
  token: string;
  data: {
    email: string;
    name: string;
  };
}

type NextScreenNavigationProp = StackNavigationProp<RootStackParamList, 'NextScreen'>;

const NextScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigation<NextScreenNavigationProp>();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Email and Password can’t be empty.');
      return;
    }

    try {
      const request = { email, password };
      const { data } = await CApi.post<LoginResponse>('/login', request, {
        headers: { 'Content-Type': 'text/plain' },
      });

      console.log('Login berhasil:', data);

      // Store user data in AsyncStorage
      await AsyncStorage.setItem('userToken', data.token);
      await AsyncStorage.setItem('userEmail', data.data.email);
      await AsyncStorage.setItem('userName', data.data.name);

      // Dispatch login data to Redux
      dispatch(setLoginData({ email, password }));

      Alert.alert('Success', 'Login successful.');
      navigation.navigate('HomeScreen'); // Sesuaikan dengan nama screen Anda
    } catch (err: any) {
      console.error('Login gagal:', err);
      const msg = err?.response?.data?.message || 'An error occurred';
      Alert.alert('Login Failed', msg);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/logoCC.png')} style={styles.logo} />
      <Text style={styles.welcomeText}>Welcome back!</Text>
      <Text style={styles.loginText}>Login to your account</Text>

      <TextInput
        style={styles.inputEmail}
        placeholder="Email"
        placeholderTextColor="#000000"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <View>
        <TextInput
          style={styles.inputPassword}
          placeholder="Password"
          placeholderTextColor="#000000"
          secureTextEntry={!isPasswordVisible}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.eyeIcon} onPress={togglePasswordVisibility}>
          <Text>{isPasswordVisible ? '🙈' : '👁️'}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
      <Text style={styles.forgotPassword}>Forgot Password?</Text>

      <View style={styles.socialButtons}>
        <TouchableOpacity style={styles.socialButton}>
          <Image source={require('../../assets/fb.png')} style={styles.socialIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Image source={require('../../assets/Google.png')} style={styles.socialIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Image source={require('../../assets/LinkedIn.png')} style={styles.socialIcon} />
        </TouchableOpacity>
      </View>

      <Text style={styles.signUpText}>
        Don’t have an account?{' '}
        <Text
          style={styles.signUpLink}
          onPress={() => navigation.navigate('RegisterScreen')}
        >
          Sign Up
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 10,
  },
  loginText: {
    fontSize: 16,
    color: '#555555',
    marginBottom: 20,
  },
  inputEmail: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#F9F9F9',
  },
  inputPassword: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#F9F9F9',
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    top: 15,
  },
  loginButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#007BFF',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgotPassword: {
    marginTop: 10,
    fontSize: 14,
    color: '#007BFF',
  },
  socialButtons: {
    flexDirection: 'row',
    marginTop: 20,
  },
  socialButton: {
    width: 50,
    height: 50,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
  },
  socialIcon: {
    width: 30,
    height: 30,
  },
  signUpText: {
    marginTop: 20,
    fontSize: 14,
    color: '#555555',
  },
  signUpLink: {
    color: '#007BFF',
    fontWeight: 'bold',
  },
});

export default NextScreen;
