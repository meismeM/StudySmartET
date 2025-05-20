import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ResetPasswordScreen from '../../src/screens/ResetPasswordScreen'; // Adjust path
import { Alert } from 'react-native';

// Mock navigation
const mockNavigate = jest.fn();
const mockNavigation = {
  navigate: mockNavigate,
  // goBack: jest.fn(), // if needed
};

// Spy on Alert.alert
jest.spyOn(Alert, 'alert');
// Suppress console.log from the component
jest.spyOn(console, 'log').mockImplementation(() => {});

describe('ResetPasswordScreen', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    (Alert.alert as jest.Mock).mockClear();
  });

  it('renders correctly with input fields and button', () => {
    const { getByPlaceholderText, getByText } = render(
      <ResetPasswordScreen navigation={mockNavigation as any} />
    );

    expect(getByPlaceholderText('New Password')).toBeTruthy();
    expect(getByPlaceholderText('Confirm New Password')).toBeTruthy();
    expect(getByText('Submit')).toBeTruthy();
  });

  it('updates input fields correctly', () => {
    const { getByPlaceholderText } = render(
      <ResetPasswordScreen navigation={mockNavigation as any} />
    );

    const newPasswordInput = getByPlaceholderText('New Password');
    const confirmPasswordInput = getByPlaceholderText('Confirm New Password');

    fireEvent.changeText(newPasswordInput, 'newPassword123');
    fireEvent.changeText(confirmPasswordInput, 'newPassword123');

    expect(newPasswordInput.props.value).toBe('newPassword123');
    expect(confirmPasswordInput.props.value).toBe('newPassword123');
  });

  // Validation Tests
  it('shows alert if New Password is empty on submit', () => {
    const { getByText } = render(<ResetPasswordScreen navigation={mockNavigation as any} />);
    fireEvent.press(getByText('Submit'));
    expect(Alert.alert).toHaveBeenCalledWith('Error', 'Password fields cannot be empty');
  });

  it('shows alert if Confirm New Password is empty on submit', () => {
    const { getByText, getByPlaceholderText } = render(<ResetPasswordScreen navigation={mockNavigation as any} />);
    fireEvent.changeText(getByPlaceholderText('New Password'), 'password123');
    fireEvent.press(getByText('Submit'));
    expect(Alert.alert).toHaveBeenCalledWith('Error', 'Password fields cannot be empty');
  });

  it('shows alert if password is less than 8 characters', () => {
    const { getByText, getByPlaceholderText } = render(<ResetPasswordScreen navigation={mockNavigation as any} />);
    fireEvent.changeText(getByPlaceholderText('New Password'), 'pass');
    fireEvent.changeText(getByPlaceholderText('Confirm New Password'), 'pass');
    fireEvent.press(getByText('Submit'));
    expect(Alert.alert).toHaveBeenCalledWith('Error', 'Password must be at least 8 characters long.');
  });

  it('shows alert if passwords do not match', () => {
    const { getByText, getByPlaceholderText } = render(<ResetPasswordScreen navigation={mockNavigation as any} />);
    fireEvent.changeText(getByPlaceholderText('New Password'), 'password123');
    fireEvent.changeText(getByPlaceholderText('Confirm New Password'), 'password456');
    fireEvent.press(getByText('Submit'));
    expect(Alert.alert).toHaveBeenCalledWith('Error', 'Passwords do not match');
  });

  // Simulated Password Update Test
  it('shows success alert and navigates to Login on successful password update', () => {
    const { getByText, getByPlaceholderText } = render(
      <ResetPasswordScreen navigation={mockNavigation as any} />
    );

    fireEvent.changeText(getByPlaceholderText('New Password'), 'newValidPassword');
    fireEvent.changeText(getByPlaceholderText('Confirm New Password'), 'newValidPassword');
    fireEvent.press(getByText('Submit'));

    expect(Alert.alert).toHaveBeenCalledWith('Success', 'Password has been reset successfully!');
    expect(mockNavigate).toHaveBeenCalledWith('Login');
  });
});
