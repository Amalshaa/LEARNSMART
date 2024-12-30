import React from 'react';
import { View, StyleSheet, Alert, Text } from 'react-native';
import InputField from '../components/InputField';
import Button from '../components/Button';
import useFormHandler from '../hooks/UseFormHandler';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const { values, errors, handleChange, validate } = useFormHandler({
    email: '',
    password: '',
  });

  const handleLogin = async () => {
    const isValid = validate({
      email: { required: true, email: true },
      password: { required: true },
    });

    if (isValid) {
      try {
        const usersData = await AsyncStorage.getItem('users');
        const users = usersData ? JSON.parse(usersData) : [];

        const user = users.find(
          (user) => user.email === values.email && user.password === values.password
        );

        if (user) {
          Alert.alert('Login Successful', `Welcome ${user.firstName}`);
          navigation.navigate('Home');
        } else {
          Alert.alert('Login Failed', 'Invalid email or password');
        }
      } catch (error) {
        Alert.alert('Error', 'Something went wrong during login');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Welcome Back</Text>
      <Text style={styles.subHeaderText}>Please login to continue</Text>
      <InputField
        label="Email"
        value={values.email}
        onChangeText={(value) => handleChange('email', value)}
        error={errors.email}
        style={styles.inputField}
        labelStyle={styles.labelStyle}
      />
      <InputField
        label="Password"
        secureTextEntry
        value={values.password}
        onChangeText={(value) => handleChange('password', value)}
        error={errors.password}
        style={styles.inputField}
        labelStyle={styles.labelStyle}
      />
      <Button title="Login" onPress={handleLogin} style={styles.loginButton} />
      <Button
        title="Register"
        onPress={() => navigation.navigate('Register')}
        style={styles.registerButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    backgroundColor: '#ADD8E6',
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFF',
    marginBottom: 10,
  },
  subHeaderText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
    marginBottom: 20,
  },
  inputField: {
    marginBottom: 15,
    backgroundColor: '#E0FFFF',
    borderRadius: 8,
    padding: 10,
    color: '#333',
  },
  labelStyle: {
    color: '#333',
    fontSize: 14,
  },
  loginButton: {
    marginTop: 20,
    backgroundColor: '#1F75FE',
    borderRadius: 8,
    padding: 12,
  },
  registerButton: {
    marginTop: 15,
    backgroundColor: '#4682B4',
    borderRadius: 8,
    padding: 12,
  },
});

export default LoginScreen;
