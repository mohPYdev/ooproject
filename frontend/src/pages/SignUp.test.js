import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useSignup } from '../hooks/useSignup';
import SignUp from './SignUp';
import { MemoryRouter } from 'react-router-dom';
jest.mock('../hooks/useSignup'); // Mock the useSignup hook

describe('SignUp', () => {
    beforeEach(() => {
        useSignup.mockReturnValue({
            signup: jest.fn(),
            isPending: false,
            error: null,
        });
    });

    it('renders the SignUp component', () => {
        render(<MemoryRouter><SignUp /></MemoryRouter>);
        expect(screen.getByRole('heading')).toBeInTheDocument();
    });

    it('submits the signup form with valid input', () => {
        const mockSignup = jest.fn();
        useSignup.mockReturnValue({
            signup: mockSignup,
            isPending: false,
            error: null,
        });

        render(<MemoryRouter><SignUp /></MemoryRouter>);

        // Fill in the form fields
        fireEvent.change(screen.getByPlaceholderText('نام کاربری'), {
            target: { value: 'maryamnsi' },
        });
        fireEvent.change(screen.getByPlaceholderText('ایمیل'), {
            target: { value: 'maryam@example.com' },
        });
        fireEvent.change(screen.getByPlaceholderText('رمز عبور'), {
            target: { value: '123456' },
        });
        fireEvent.change(screen.getByPlaceholderText('شماره تلفن'), {
            target: { value: '1234567890' },
        });

        // Submit the form
        fireEvent.click(screen.getByRole('button'));

        // Assert that the signup function is called with the correct values
        expect(mockSignup).toHaveBeenCalledWith(
            'maryam@example.com',
            '123456',
            'maryamnsi',
            '',
            '',
            '1234567890'
        );
    });

    it('disables the submit button when form fields are empty', () => {
        render(<MemoryRouter><SignUp /></MemoryRouter>);
        const submitButton = screen.getByRole('button');
        expect(submitButton).toBeDisabled();
    });

    it('displays an error message when there is an error', () => {
        const mockSignup = jest.fn();
        useSignup.mockReturnValue({
            signup: mockSignup,
            isPending: false,
            error: {
                email: ['This field may not be blank.'],
            },
        });

        render(<MemoryRouter><SignUp /></MemoryRouter>);
        expect(screen.getByText('فیلد های خالی را پر کنید')).toBeInTheDocument();
    });
    it('displays an error message when there is short password', () => {
        const mockSignup = jest.fn();
        useSignup.mockReturnValue({
            signup: mockSignup,
            isPending: false,
            error: {
                email: ['This password is too short. It must contain at least 8 characters.'],
            },
        });

        render(<MemoryRouter><SignUp /></MemoryRouter>);
        expect(screen.getByText('(رمز عبور وارد شده کوتاه می باشد ( رمز عبور می بایست حداقل از ۸ کاراکتر تشکیل شود')).toBeInTheDocument();
    });
    it('displays an error message when there is numeric password', () => {
        const mockSignup = jest.fn();
        useSignup.mockReturnValue({
            signup: mockSignup,
            isPending: false,
            error: {
                email: ['This password is entirely numeric.'],
            },
        });

        render(<MemoryRouter><SignUp /></MemoryRouter>);
        expect(screen.getByText('رمزعبور باید از حروف و عدد تشکیل شده باشد')).toBeInTheDocument();
    });
    it('displays an error message when there wrong email address', () => {
        const mockSignup = jest.fn();
        useSignup.mockReturnValue({
            signup: mockSignup,
            isPending: false,
            error: {
                email: ['Enter a valid email address.'],
            },
        });

        render(<MemoryRouter><SignUp /></MemoryRouter>);
        expect(screen.getByText('ایمیل وارد شده معتبر نمی باشد')).toBeInTheDocument();
    });

    it('displays a loading spinner when isPending is true', () => {
        const mockSignup = jest.fn();
        useSignup.mockReturnValue({
            signup: mockSignup,
            isPending: true,
            error: null,
        });

        render(<MemoryRouter><SignUp /></MemoryRouter>);
        expect(screen.getByTestId('loader')).toBeInTheDocument();
    });
});
