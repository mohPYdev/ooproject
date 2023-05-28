import React from 'react';
import { render, screen } from '@testing-library/react';
import Profile from './Profile';
import { MemoryRouter } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { useFetch } from '../hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
// jest.mock('../hooks/useFetch')
// jest.mock('../hooks/useAuthContext', () => ({
//     useAuthContext: jest.fn(),
// }));
// jest.mock('react-router-dom', () => ({
//     useNavigate: jest.fn(),
// }));

describe('Profile component', () => {
    beforeEach(() => {
        // useNavigate.mockClear();

        // useAuthContext.mockClear();
    });
    test('renders profile page with user information', () => {

        // Mock the user data
        const user = {
            username: 'testuser',
            email: 'test@example.com',
            phone_number: '1234567890',
            id: 2,

        };
        // useAuthContext.mockReturnValue({
        //     user: user
        // });

        // Render the component with mocked data
        // render(
        //     <MemoryRouter>
        //         <Profile
        //             user={user}
        //         /></MemoryRouter>

        // );
        render(<Profile />, {
            // Provide a custom context value for useAuthContext
            // to mock the user data
            wrapper: ({ children }) => (
                <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
            ),
        });

        // Assert that the user information is rendered
        expect(screen.getByText(user.username)).toBeInTheDocument();
        expect(screen.getByText(user.email)).toBeInTheDocument();
        expect(screen.getByText(user.phone_number)).toBeInTheDocument();



    });
    test('renders profile page with reservation information', () => {
        // Mock the reservations data
        // Mock the user data
        const user = {
            username: 'testuser',
            email: 'test@example.com',
            phone_number: '1234567890',
            id: 2,

        };
        const reservations = [
            {
                id: 1,
                item: 'محصول',
                shift: 1,
                service: 'سرویس',
                time_date: 'زمان',
                code: 'کد تائید',
            },
            // Add more reservation objects if needed
        ];
        // render(
        //     <MemoryRouter>
        //         <Profile
        //         />
        //     </MemoryRouter>
        // );
        render(<Profile />, {
            // Provide a custom context value for useAuthContext
            // to mock the user data
            wrapper: ({ children }) => (
                <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
            ),
        });
        // Assert that the reservations are rendered
        const reservation = reservations[0]

        expect(screen.getByText(reservation.item)).toBeInTheDocument();
        expect(screen.getByText(reservation.service)).toBeInTheDocument();
        expect(screen.getByText(reservation.time_date)).toBeInTheDocument();
        expect(screen.getByText(reservation.code)).toBeInTheDocument();
    })
})
