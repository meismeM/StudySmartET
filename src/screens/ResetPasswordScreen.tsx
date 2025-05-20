import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App'; // Adjust path as necessary

type ResetPasswordScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ResetPassword'>;

interface Props {
  navigation: ResetPasswordScreenNavigationProp;
}

const ResetPasswordScreen: React.FC<Props> = ({ navigation }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const handleSubmit = () => {
    if (!newPassword || !confirmNewPassword) {
      const errorMessage = 'Password fields cannot be empty';
      console.log(errorMessage);
      Alert.alert('Error', errorMessage);
      return;
    }

    if (newPassword.length < 8) {
      const errorMessage = 'Password must be at least 8 characters long.';
      console.log(errorMessage);
      Alert.alert('Error', errorMessage);
      return;
    }

    if (newPassword !== confirmNewPassword) {
      const errorMessage = 'Passwords do not match';
      console.log(errorMessage);
      Alert.alert('Error', errorMessage);
      return;
    }
    // TODO: Implement loading indicator while resetting password
    // Implement password reset logic here
    console.log("Password update successful for user verified_user");
    Alert.alert('Success', 'Password has been reset successfully!');
    // Clear fields after submission
    setNewPassword('');
    setConfirmNewPassword('');
    navigation.navigate('Login'); // Navigate to Login screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>

      <TextInput
        style={styles.input}
        placeholder="New Password"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm New Password"
        value={confirmNewPassword}
        onChangeText={setConfirmNewPassword}
        secureTextEntry
      />

      <View style={styles.buttonContainer}>
        <Button title="Submit" onPress={handleSubmit} />
      </View>
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
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    width: '100%',
    marginTop: 20,
  },
});

export default ResetPasswordScreen;
