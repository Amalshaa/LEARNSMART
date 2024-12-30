import React from 'react';
import { View, StyleSheet, Text, ScrollView, Alert } from 'react-native';
import InputField from '../components/InputField';
import Button from '../components/Button';
import useFormHandler from '../hooks/UseFormHandler';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisterScreen = ({ navigation }) => {
  const { values, errors, handleChange, validate } = useFormHandler({
    firstName: '',
    lastName: '',
    mobileNo: '',
    email: '',
    password: '',
    reenterPassword: '',
  });

  const handleRegister = async () => {
    const isValid = validate({
      firstName: { required: true },
      lastName: { required: true },
      mobileNo: { required: true, numeric: true },
      email: { required: true, email: true },
      password: { required: true, minLength: 6 },
      reenterPassword: { required: true, match: 'password' },
    });

    if (!isValid) return;

    if (values.password !== values.reenterPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    const newUser = {
      firstName: values.firstName,
      lastName: values.lastName,
      mobileNo: values.mobileNo,
      email: values.email,
      password: values.password,
    };

    try {
      const existingUsers = await AsyncStorage.getItem('users');
      const users = existingUsers ? JSON.parse(existingUsers) : [];
      users.push(newUser);
      await AsyncStorage.setItem('users', JSON.stringify(users));
      Alert.alert('Registration Successful');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Error', 'Failed to save user');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Create Account</Text>
      </View>

      {/* Form */}
      <ScrollView contentContainerStyle={styles.formContainer}>
        <Text style={styles.subHeaderText}>Register to get started</Text>
        <InputField
          label="First Name"
          value={values.firstName}
          onChangeText={(value) => handleChange('firstName', value)}
          error={errors.firstName}
          style={styles.inputField}
          labelStyle={styles.labelStyle}
        />
        <InputField
          label="Last Name"
          value={values.lastName}
          onChangeText={(value) => handleChange('lastName', value)}
          error={errors.lastName}
          style={styles.inputField}
          labelStyle={styles.labelStyle}
        />
        <InputField
          label="Mobile Number"
          keyboardType="phone-pad"
          value={values.mobileNo}
          onChangeText={(value) => handleChange('mobileNo', value)}
          error={errors.mobileNo}
          style={styles.inputField}
          labelStyle={styles.labelStyle}
        />
        <InputField
          label="Email"
          keyboardType="email-address"
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
        <InputField
          label="Re-enter Password"
          secureTextEntry
          value={values.reenterPassword}
          onChangeText={(value) => handleChange('reenterPassword', value)}
          error={errors.reenterPassword}
          style={styles.inputField}
          labelStyle={styles.labelStyle}
        />
        <Button title="Register" onPress={handleRegister} style={styles.registerButton} />
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account? Login!</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ADD8E6',
  },
  header: {
    padding: 16,
    backgroundColor: '#1F75FE',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  formContainer: {
    flexGrow: 1,
    padding: 16,
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
  registerButton: {
    marginTop: 20,
    backgroundColor: '#1F75FE',
    borderRadius: 8,
    padding: 12,
  },
  footer: {
    padding: 16,
    backgroundColor: '#4682B4',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#FFF',
  },
});

export default RegisterScreen;
