import React from 'react';
import { render, screen } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import Navbarc from './Navbarc';
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout';

jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
}));

jest.mock('../hooks/useAuthContext', () => ({
    useAuthContext: jest.fn(),
}));

jest.mock('../hooks/useLogout', () => ({
    useLogout: jest.fn(),
}));

describe('Navbarc component', () => {
    beforeEach(() => {
        useNavigate.mockClear();
        useAuthContext.mockClear();
        useLogout.mockClear();
    });

    it('renders the navbar with links when user is authenticated', () => {
        useNavigate.mockReturnValue(jest.fn());
        useAuthContext.mockReturnValue({
            user: {
                email: 's@gmail.com',
                id: 2,
                username: 'negar',
                phone_number: '3',
            },
        });
        useLogout.mockReturnValue({
            logout: jest.fn(),
            error: null,
            isPending: false,
        });

        render(<Navbarc />);

        expect(screen.queryByText('بیمارستان')).not.toBeInTheDocument();
        expect(screen.getByText('خانه')).toBeInTheDocument();
        expect(screen.getByText('پروفایل')).toBeInTheDocument();
        expect(screen.getByTestId('exit')).toBeInTheDocument();
    });

    it('renders the navbar with links when user is not authenticated', () => {
        useNavigate.mockReturnValue(jest.fn());
        useAuthContext.mockReturnValue({
            user: null,
        });
        useLogout.mockReturnValue({
            logout: jest.fn(),
            error: null,
            isPending: false,
        });

        render(<Navbarc />);

        expect(screen.getByText('بیمارستان')).toBeInTheDocument();
        expect(screen.getByText('ثبت نام')).toBeInTheDocument();
        expect(screen.getByText('ورود')).toBeInTheDocument();
    });

    it('calls logout and navigates to the home page when "خروج" link is clicked', () => {
        const navigateMock = jest.fn();
        const logoutMock = jest.fn();
        useNavigate.mockReturnValue(navigateMock);
        useAuthContext.mockReturnValue({
            user: {
                email: 's@gmail.com',
                id: 2,
                username: 'negar',
                phone_number: '3',
            },
        });
        useLogout.mockReturnValue({
            logout: logoutMock,
            error: null,
            isPending: false,
        });

        render(<Navbarc />);
        const exitLink = screen.getByTestId('exit');
        exitLink.click();

        expect(logoutMock).toHaveBeenCalled();
        expect(navigateMock).toHaveBeenCalledWith('/');
    });
});

