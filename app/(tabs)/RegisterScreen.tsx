import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { setData, resetData } from '../../store/reducer/NextScreenReducer';
import { RootState } from '../../store';
import axios from 'axios';

const RegisterScreen: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();
  const registerForm = useSelector((state: RootState) => state.login.loginInput);

  // Handle input changes
  const onChangeValue = (key: string, value: string) => {
    dispatch(setData({ [key]: value }));
  };

  // Handle form submission
  const onSaveData = async () => {
    try {
      if (registerForm.password !== registerForm.confirm_password) {
        Alert.alert('Error', 'Passwords do not match!');
        return;
      }

      const response = await axios.post(
        'https://portofolio-five-mocha.vercel.app/api/register',
        registerForm
      );
      Alert.alert('Success', 'Registration successful!');
      dispatch(resetData());
      navigation.navigate('NextScreen'); // Navigate to the next screen
    } catch (error) {
      Alert.alert('Error', 'Registration failed. Please try again.');
    }
  };

  // Validasi password
  const isPasswordValid = registerForm.password?.length >= 8;
  const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(registerForm.password);

  return (
    <ScrollView style={styles.container}>
      {/* Logo */}
      <Image source={require('../../assets/logoCC.png')} style={styles.logo} />

      {/* Welcome Text */}
      <Text style={styles.welcomeText}>Welcome</Text>
      <Text style={styles.subtitleText}>Create your account</Text>

      {/* Name Input */}
      <TextInput
        style={[styles.input, styles.inputName]}
        placeholder="Name"
        placeholderTextColor="#000000"
        value={registerForm.name}
        onChangeText={(value) => onChangeValue('name', value)}
      />

      {/* Email Input */}
      <TextInput
        style={[styles.input, styles.inputEmail]}
        placeholder="Email"
        placeholderTextColor="#000000"
        value={registerForm.email}
        onChangeText={(value) => onChangeValue('email', value)}
      />

      {/* Password Input */}
      <TextInput
        style={[styles.input, styles.inputPassword]}
        placeholder="Password"
        placeholderTextColor="#000000"
        secureTextEntry
        value={registerForm.password}
        onChangeText={(value) => onChangeValue('password', value)}
      />

      {/* Confirm Password Input */}
      <TextInput
        style={[styles.input, styles.inputConfirmPassword]}
        placeholder="Confirm Password"
        placeholderTextColor="#000000"
        secureTextEntry
        value={registerForm.confirm_password}
        onChangeText={(value) => onChangeValue('confirm_password', value)}
      />

      {/* Password Validation */}
      <View style={styles.validationContainer}>
        <Text style={[styles.validationText, isPasswordValid ? styles.valid : styles.invalid]}>
          Password must be at least 8 characters.
        </Text>
        <Text style={[styles.validationText, hasSpecialCharacter ? styles.valid : styles.invalid]}>
          Password must contain one special character.
        </Text>
      </View>

      {/* Submit Button */}
      <TouchableOpacity style={styles.registerButton} onPress={onSaveData}>
        <Text style={styles.registerButtonText}>Sign up</Text>
      </TouchableOpacity>

      {/* Already have an account? */}
      <Text style={styles.loginText}>
        Already have an account?{' '}
        <Text
          style={styles.loginLink}
          onPress={() => navigation.navigate('NextScreen')}
        >
          Login
        </Text>
      </Text>
    </ScrollView>
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
    top: 180,
    left: 34,
    fontSize: 24,
    fontWeight: '600',
    color: 'rgba(0, 0, 0, 0.78)',
  },
  subtitleText: {
    position: 'absolute',
    top: 210,
    left: 34,
    fontSize: 13,
    fontWeight: 'bold',
    color: 'rgba(0, 0, 0, 0.32)',
  },
  input: {
    width: 317,
    height: 57,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 20,
  },
  inputName: {
    marginTop: 250,
    alignSelf: 'center',
  },
  inputEmail: {
    marginTop: 1,
    alignSelf: 'center',
  },
  inputPassword: {
    marginTop: 1,
    alignSelf: 'center',
  },
  inputConfirmPassword: {
    marginTop: 1,
    alignSelf: 'center',
  },
  validationContainer: {
    marginTop: 10,
    alignSelf: 'center',
  },
  validationText: {
    fontSize: 12,
    marginBottom: 5,
  },
  valid: {
    color: '#5E62DB',
  },
  invalid: {
    color: 'red',
  },
  registerButton: {
    marginTop: 20,
    alignSelf: 'center',
    width: 317,
    height: 37,
    backgroundColor: '#0D2063',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  loginText: {
    marginTop: 20,
    alignSelf: 'center',
    fontSize: 13,
    fontWeight: '500',
    color: 'rgba(0, 0, 0, 0.32)',
    textAlign: 'center',
  },
  loginLink: {
    color: 'rgba(0, 0, 0, 0.6)',
    fontWeight: '500',
  },
});

export default RegisterScreen;
