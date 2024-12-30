import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('../../assets/eduapp2.jpg')} 
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Text style={styles.appName}>LEARNSMART</Text>
        <Text style={styles.welcomeText}>Discover the world of knowledge in AI and IT.</Text>
        <TouchableOpacity
          style={[styles.button, styles.loginButton]}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.registerButton]}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)', 
    padding: 16,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  welcomeText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 24,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 8,
    width: '60%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButton: {
    backgroundColor: '#fff', 
    borderWidth: 1,
    borderColor: '#007BFF', 
  },
  registerButton: {
    backgroundColor: '#f8f9fa', 
    borderWidth: 1,
    borderColor: '#6C757D', 
  },
  buttonText: {
    color: '#007BFF', 
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;
