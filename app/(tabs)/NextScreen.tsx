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
    backgroundColor: 'white',
  },
  logo: {
    position: 'absolute',
    top: 51,
    left: 140,
    width: 113,
    height: 111,
  },
  welcomeText: {
    position: 'absolute',
    top: 226,
    left: 34,
    width: 326,
    height: 26,
    fontSize: 24,
    fontWeight: '600',
    color: 'rgba(0, 0, 0, 0.78)',
  },
  loginText: {
    position: 'absolute',
    top: 261,
    left: 34,
    width: 326,
    height: 23,
    fontSize: 13,
    fontWeight: 'bold',
    color: 'rgba(0, 0, 0, 0.32)',
  },
  inputEmail: {
    position: 'absolute',
    top: 315,
    left: 37,
    width: 317,
    height: 57,
    borderWidth: 1,
    borderColor: '#747474',
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    fontWeight: '500',
    color: '#000000',
  },
  inputPassword: {
    position: 'absolute',
    top: 403,
    left: 38,
    width: 317,
    height: 57,
    borderWidth: 1,
    borderColor: '#747474',
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    fontWeight: '500',
    color: '#000000',
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    top: 15,
  },
  loginButton: {
    position: 'absolute',
    top: 504,
    left: 39,
    width: 315,
    height: 37,
    backgroundColor: '#0D2063',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  forgotPassword: {
    position: 'absolute',
    top: 577,
    left: 34,
    width: 326,
    height: 23,
    fontSize: 13,
    fontWeight: '500',
    color: 'rgba(17, 14, 14, 0.6)',
    textAlign: 'center',
  },
  socialButtons: {
    position: 'absolute',
    top: 652,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 150,
    left: '50%',
    transform: [{ translateX: -75 }],
  },
  socialButton: {
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  socialIcon: {
    width: 35,
    height: 35,
  },
  signUpText: {
    position: 'absolute',
    top: 730,
    left: 27,
    width: 326,
    height: 23,
    fontSize: 13,
    fontWeight: '500',
    color: 'rgba(0, 0, 0, 0.32)',
    textAlign: 'center',
  },
  signUpLink: {
    color: 'rgba(0, 0, 0, 0.6)',
    fontWeight: '500',
  },
});

export default NextScreen;
