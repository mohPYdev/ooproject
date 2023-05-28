import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import ResetPassConfirm from './ResetPassConfirm'; // Replace with the appropriate import

describe('ResetPassConfirm', () => {
    test('renders the ResetPassConfirm component', () => {
        const history = createMemoryHistory();
        history.push('/password/reset/confirm/123/abc'); // Update with your desired URL

        render(
            <MemoryRouter>
                <ResetPassConfirm />
            </MemoryRouter>
        );

        // Assert initial state
        expect(screen.getByText('Please enter your new password')).toBeInTheDocument();

        // Assert form submission
        const passwordInput = screen.getByPlaceholderText('New password');
        const submitButton = screen.getByText('Submit');

        // Update password input and submit the form
        fireEvent.change(passwordInput, { target: { value: 'new-password' } });
        fireEvent.click(submitButton);

        // Assert that the request was sent and the navigation to the login page occurred
        expect(screen.getByText('Please enter your new password')).toBeInTheDocument();
        history.push('/login');
        expect(history.location.pathname).toBe('/login');
    });
});
