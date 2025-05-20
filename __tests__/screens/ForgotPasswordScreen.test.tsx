import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import ForgotPasswordScreen from '../../src/screens/ForgotPasswordScreen'; // Adjust path
import { Alert } from 'react-native';

// Mock navigation
const mockNavigate = jest.fn();
const mockNavigation = {
  navigate: mockNavigate,
  goBack: jest.fn(), // Assuming cancel might use goBack or navigate to Login
};

// Spy on Alert.alert
jest.spyOn(Alert, 'alert');
// Suppress console.log from the component
jest.spyOn(console, 'log').mockImplementation(() => {});

describe('ForgotPasswordScreen', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    (Alert.alert as jest.Mock).mockClear();
  });

  it('renders correctly with input fields and buttons', () => {
    const { getByPlaceholderText, getByText } = render(
      <ForgotPasswordScreen navigation={mockNavigation as any} />
    );

    expect(getByPlaceholderText('Full Name')).toBeTruthy();
    expect(getByPlaceholderText('Grade')).toBeTruthy();
    expect(getByPlaceholderText('Phone Number')).toBeTruthy();
    expect(getByText('Submit')).toBeTruthy();
    expect(getByText('Cancel')).toBeTruthy();
  });

  it('updates input fields correctly', () => {
    const { getByPlaceholderText } = render(
      <ForgotPasswordScreen navigation={mockNavigation as any} />
    );

    const fullNameInput = getByPlaceholderText('Full Name');
    const gradeInput = getByPlaceholderText('Grade');
    const phoneInput = getByPlaceholderText('Phone Number');

    fireEvent.changeText(fullNameInput, 'John Doe');
    fireEvent.changeText(gradeInput, '12');
    fireEvent.changeText(phoneInput, '1234567890');

    expect(fullNameInput.props.value).toBe('John Doe');
    expect(gradeInput.props.value).toBe('12');
    expect(phoneInput.props.value).toBe('1234567890');
  });

  // Validation Tests
  it('shows alert if Full Name is empty on submit', () => {
    const { getByText } = render(<ForgotPasswordScreen navigation={mockNavigation as any} />);
    fireEvent.press(getByText('Submit'));
    expect(Alert.alert).toHaveBeenCalledWith('Error', 'Full Name is required.');
  });

  it('shows alert if Grade is empty on submit', () => {
    const { getByText, getByPlaceholderText } = render(<ForgotPasswordScreen navigation={mockNavigation as any} />);
    fireEvent.changeText(getByPlaceholderText('Full Name'), 'John Doe');
    fireEvent.press(getByText('Submit'));
    expect(Alert.alert).toHaveBeenCalledWith('Error', 'Grade is required.');
  });

  it('shows alert if Phone Number is empty on submit', () => {
    const { getByText, getByPlaceholderText } = render(<ForgotPasswordScreen navigation={mockNavigation as any} />);
    fireEvent.changeText(getByPlaceholderText('Full Name'), 'John Doe');
    fireEvent.changeText(getByPlaceholderText('Grade'), '10');
    fireEvent.press(getByText('Submit'));
    expect(Alert.alert).toHaveBeenCalledWith('Error', 'Phone Number is required.');
  });

  it('shows alert for invalid phone number format (too short)', () => {
    const { getByText, getByPlaceholderText } = render(<ForgotPasswordScreen navigation={mockNavigation as any} />);
    fireEvent.changeText(getByPlaceholderText('Full Name'), 'Test User');
    fireEvent.changeText(getByPlaceholderText('Grade'), '10');
    fireEvent.changeText(getByPlaceholderText('Phone Number'), '123'); // Invalid
    fireEvent.press(getByText('Submit'));
    expect(Alert.alert).toHaveBeenCalledWith('Error', 'Invalid Phone Number format. It should be 7-15 digits.');
  });
  
  it('shows alert for invalid phone number format (non-digits)', () => {
    const { getByText, getByPlaceholderText } = render(<ForgotPasswordScreen navigation={mockNavigation as any} />);
    fireEvent.changeText(getByPlaceholderText('Full Name'), 'Test User');
    fireEvent.changeText(getByPlaceholderText('Grade'), '10');
    fireEvent.changeText(getByPlaceholderText('Phone Number'), '1234567abc'); // Invalid
    fireEvent.press(getByText('Submit'));
    expect(Alert.alert).toHaveBeenCalledWith('Error', 'Invalid Phone Number format. It should be 7-15 digits.');
  });


  // Simulated Verification Tests
  it('navigates to ResetPassword on successful verification', () => {
    const { getByText, getByPlaceholderText } = render(
      <ForgotPasswordScreen navigation={mockNavigation as any} />
    );

    fireEvent.changeText(getByPlaceholderText('Full Name'), 'Test User');
    fireEvent.changeText(getByPlaceholderText('Grade'), '10');
    fireEvent.changeText(getByPlaceholderText('Phone Number'), '1234567890');
    fireEvent.press(getByText('Submit'));

    expect(Alert.alert).toHaveBeenCalledWith('Success', 'Verification successful!');
    expect(mockNavigate).toHaveBeenCalledWith('ResetPassword');
  });

  it('shows error alert on failed verification', () => {
    const { getByText, getByPlaceholderText } = render(
      <ForgotPasswordScreen navigation={mockNavigation as any} />
    );

    fireEvent.changeText(getByPlaceholderText('Full Name'), 'Wrong User');
    fireEvent.changeText(getByPlaceholderText('Grade'), '11');
    fireEvent.changeText(getByPlaceholderText('Phone Number'), '0987654321');
    fireEvent.press(getByText('Submit'));

    expect(Alert.alert).toHaveBeenCalledWith("Verification Failed", "The information provided does not match our records. Please check your details and try again.");
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  // Cancel Button Test
  it('navigates to Login screen on Cancel press', () => {
    const { getByText } = render(<ForgotPasswordScreen navigation={mockNavigation as any} />);
    fireEvent.press(getByText('Cancel'));
    // Assuming it navigates to 'Login'. If it uses goBack(), this needs adjustment
    // or the mockNavigation.goBack needs to be checked.
    // The component currently uses navigation.navigate('Login') for cancel.
    expect(mockNavigate).toHaveBeenCalledWith('Login'); 
  });
});
