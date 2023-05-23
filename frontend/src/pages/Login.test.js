import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import Login from './Login';
import { useLogin } from '../hooks/useLogin';

jest.mock('../hooks/useLogin', () => ({
  useLogin: jest.fn(),
}));

describe('Login component', () => {
  beforeEach(() => {
    useLogin.mockReturnValue({
      login: jest.fn(),
      isPending: false,
      error: null,
    });
  });

  it('should render login form and handle submission', async () => {
    render(<Login />);

    const usernameInput = screen.getByTestId('username');
    const passwordInput = screen.getByTestId('password');
    const submitButton = screen.getByRole('button', { name: 'ورود' });

    fireEvent.change(usernameInput, { target: { value: 'negar' } });
    fireEvent.change(passwordInput, { target: { value: 'Negar@barooti79' } });

    expect(usernameInput.value).toBe('negar');
    expect(passwordInput.value).toBe('Negar@barooti79');

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(useLogin().login).toHaveBeenCalledWith('negar', 'Negar@barooti79');
    });

    expect(usernameInput.value).toBe('');
    expect(passwordInput.value).toBe('');
  });

  it('should display error message if there is an error', () => {
    const errorMessage = 'نام کاربری یا رمزعبور اشتباه می باشد';

    useLogin.mockReturnValue({
      login: jest.fn(),
      isPending: false,
      error: errorMessage,
    });

    render(<Login />);

    const errorAlert = screen.getByText(errorMessage);

    expect(errorAlert).toBeInTheDocument();
  });

  it('should disable submit button when username or password is empty', () => {
    render(<Login />);

    const submitButton = screen.getByRole('button', { name: 'ورود' });

    expect(submitButton).toBeDisabled();

    const usernameInput = screen.getByTestId('username');
    const passwordInput = screen.getByTestId('password');

    fireEvent.change(usernameInput, { target: { value: 'negar' } });

    expect(submitButton).toBeDisabled();

    fireEvent.change(passwordInput, { target: { value: 'Negar@barooti79' } });

    expect(submitButton).not.toBeDisabled();
  });
});
