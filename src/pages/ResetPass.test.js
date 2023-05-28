import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ResetPass from './ResetPass'; // Replace with the appropriate import

describe('ResetPass', () => {
  test('renders the ResetPass component', () => {
    render(<ResetPass />);

    // Assert initial state
    expect(screen.queryByText('check your email')).toBeNull();
    expect(screen.getByText('Please enter your email address')).toBeInTheDocument();

    // Assert form submission
    const emailInput = screen.getByPlaceholderText('email');
    const submitButton = screen.getByText('Submit');

    // Update email input and submit the form
    fireEvent.change(emailInput, { target: { value: 's@gmail.com' } });
    fireEvent.click(submitButton);



    // Assert that the request was sent and "check your email" message is displayed
    expect(emailInput.value).toBe('s@gmail.com');
  });
});
