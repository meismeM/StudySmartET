import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import LoginScreen from '../../src/screens/LoginScreen'; // Adjust path as necessary

// Mock navigation
const mockNavigate = jest.fn();
const mockNavigation = {
  navigate: mockNavigate,
  // Add other navigation functions like goBack if they are used by the component
};

// Suppress console.log from the component if necessary
jest.spyOn(console, 'log').mockImplementation(() => {});

describe('LoginScreen', () => {
  beforeEach(() => {
    // Clear mock calls before each test
    mockNavigate.mockClear();
  });

  it('renders correctly with title, placeholder, and buttons', () => {
    const { getByText, getByRole } = render(<LoginScreen navigation={mockNavigation as any} />);

    expect(getByText('Login')).toBeTruthy();
    expect(getByText('Username/Password Fields Placeholder')).toBeTruthy();
    expect(getByRole('button', { name: 'Login' })).toBeTruthy();
    expect(getByText('Forgot Password?')).toBeTruthy();
  });

  it('navigates to ForgotPasswordScreen when "Forgot Password?" is pressed', () => {
    const { getByText } = render(<LoginScreen navigation={mockNavigation as any} />);
    
    const forgotPasswordButton = getByText('Forgot Password?');
    fireEvent.press(forgotPasswordButton);
    
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith('ForgotPassword');
  });

  it('calls console.log on Login button press (placeholder behavior)', () => {
    const { getByRole } = render(<LoginScreen navigation={mockNavigation as any} />);
    const loginButton = getByRole('button', { name: 'Login' });
    fireEvent.press(loginButton);
    expect(console.log).toHaveBeenCalledWith('Login button pressed');
  });
});
