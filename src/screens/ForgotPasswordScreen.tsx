import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App'; // Adjust path as necessary

type ForgotPasswordScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ForgotPassword'>;

interface Props {
  navigation: ForgotPasswordScreenNavigationProp;
}

const ForgotPasswordScreen: React.FC<Props> = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [grade, setGrade] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = () => {
    // Enhanced validation
    if (!fullName.trim()) {
      Alert.alert('Error', 'Full Name is required.');
      return;
    }
    if (!grade.trim()) {
      Alert.alert('Error', 'Grade is required.');
      return;
    }
    if (!phoneNumber.trim()) {
      Alert.alert('Error', 'Phone Number is required.');
      return;
    }

    const phoneRegex = /^\d+$/;
    if (!phoneRegex.test(phoneNumber) || phoneNumber.length < 7 || phoneNumber.length > 15) {
      Alert.alert('Error', 'Invalid Phone Number format. It should be 7-15 digits.');
      return;
    }

    // TODO: Implement loading indicator while verifying information
    // Hardcoded values for verification
    const correctFullName = "Test User";
    const correctGrade = "10";
    const correctPhoneNumber = "1234567890";

    if (
      fullName === correctFullName &&
      grade === correctGrade &&
      phoneNumber === correctPhoneNumber
    ) {
      console.log("Verification successful, proceed to Reset Password screen.");
      Alert.alert('Success', 'Verification successful!'); // Keep alert for user feedback
      navigation.navigate('ResetPassword'); 
    } else {
      console.log("Verification failed, invalid information.");
      Alert.alert("Verification Failed", "The information provided does not match our records. Please check your details and try again.");
    }
  };

  const handleCancel = () => {
    console.log("Navigation to Login screen");
    navigation.navigate('Login'); // Navigate back to Login
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
      />

      <TextInput
        style={styles.input}
        placeholder="Grade"
        value={grade}
        onChangeText={setGrade}
      />

      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="numeric"
      />

      <View style={styles.buttonContainer}>
        <Button title="Submit" onPress={handleSubmit} />
        <Button title="Cancel" onPress={handleCancel} color="red" />
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
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
});

export default ForgotPasswordScreen;
