import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

// Define the type for the navigation prop for this screen
type LoginScreenNavigationProp = StackNavigationProp<any, 'Login'>; // Replace 'any' with your StackParamList if defined

interface Props {
  navigation: LoginScreenNavigationProp;
}

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword'); // Navigation action
  };

  const handleLogin = () => {
    // Placeholder for login logic
    console.log('Login button pressed');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Text style={styles.placeholder}>Username/Password Fields Placeholder</Text>
      <Button title="Login" onPress={handleLogin} />
      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  placeholder: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  forgotPasswordText: {
    marginTop: 15,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
