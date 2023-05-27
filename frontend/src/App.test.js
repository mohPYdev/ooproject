import React from 'react';
import { fireEvent, getByTestId, render, screen, waitFor } from '@testing-library/react';
import { useNavigate , useHistory } from 'react-router-dom';
import App from './App';
import { useAuthContext } from './hooks/useAuthContext';
import { MemoryRouter, Route , Routes } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Reservation from './pages/Reservation';
import Profile from './pages/Profile';
import ResetPass from './pages/ResetPass';
import ResetPassConfirm from './pages/ResetPassConfirm';
jest.mock('react-router-dom', () => ({

  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn() ,
}));

jest.mock('./hooks/useAuthContext', () => ({
  useAuthContext: jest.fn(),
}));

describe('App Component', () => {
  beforeEach(() => {
    useAuthContext.mockClear();
    useNavigate.mockClear();

  });

  test('renders the App component', () => {
    useNavigate.mockReturnValue(jest.fn());

    useAuthContext.mockReturnValue({
      user: null,
      authIsReady: true,
    });

    render(<App />);

    // Assert that the Navbarc component is rendered
    expect(screen.getByRole('navigation')).toBeInTheDocument();

    // Assert that the Home page is not rendered
    expect(screen.queryByTestId('home-page')).toBeNull();

  });
  test('renders the App component', () => {
    useNavigate.mockReturnValue(jest.fn());

    useAuthContext.mockReturnValue({
      user: null,
      authIsReady: true,
    });

    render(<App />);
    // Assert that the Login page is rendered
    expect(screen.getByTestId('login-page')).toBeInTheDocument();

    // Assert that the Signup page is not rendered
    expect(screen.queryByTestId('signup-page')).toBeNull();
  });
  test('renders the Home page when user is logged in', () => {
    // Mock the useAuthContext hook
    useNavigate.mockReturnValue(jest.fn());

    useAuthContext.mockReturnValue({
      user: {
        email: 's@gmail.com',
        id: 2,
        username: 'negar',
        phone_number: '3',
      },
      authIsReady: true,
    });

    render(<App />);    // Assert that the Home page is rendered
    expect(screen.getByTestId('home-page')).toBeInTheDocument();

    // Assert that the Login page is not rendered
    expect(screen.queryByTestId('login-page')).toBeNull();

  });
  test('renders the Home page when user is logged in', () => {
    // Mock the useAuthContext hook
    useNavigate.mockReturnValue(jest.fn());

    useAuthContext.mockReturnValue({
      user: {
        email: 's@gmail.com',
        id: 2,
        username: 'negar',
        phone_number: '3',
      },
      authIsReady: true,
    });

    render(<App />);
    // Assert that the Signup page is not rendered
    expect(screen.queryByTestId('signup-page')).toBeNull();
  });
  test('renders the Login page when authIsReady is true', () => {
    useNavigate.mockReturnValue(jest.fn());

    useAuthContext.mockReturnValue({
      user: null,
      authIsReady: true,
    });

    render(<App />);
    expect(screen.queryByTestId('home-page')).toBeNull();
    expect(screen.getByTestId('login-page')).toBeInTheDocument();
    expect(screen.queryByTestId('signup-page')).toBeNull();

  });
  test('renders the Login page when authIsReady is true', () => {
    useNavigate.mockReturnValue(jest.fn());

    useAuthContext.mockReturnValue({
      user: null,
      authIsReady: true,
    });

    render(<App />);
    expect(screen.queryByTestId('reservation-page')).toBeNull();
    expect(screen.queryByTestId('profile-page')).toBeNull();
    expect(screen.queryByTestId('resetpass-page')).toBeNull();
    expect(screen.queryByTestId('resetpassconfirm-page')).toBeNull();
  });

  test('renders the Signup page when the route is /signup', () => {
    useNavigate.mockReturnValue(jest.fn());

    useAuthContext.mockReturnValue({
      user: null,
      authIsReady: true,
    });

    render(<SignUp />, { wrapper: MemoryRouter, initialEntries: ['/signup'] });


    expect(screen.queryByTestId('profile-page')).toBeNull();
    expect(screen.queryByTestId('resetpass-page')).toBeNull();
    expect(screen.queryByTestId('resetpassconfirm-page')).toBeNull();
  });
  test('renders the Signup page when the route is /signup', () => {
    useNavigate.mockReturnValue(jest.fn());

    useAuthContext.mockReturnValue({
      user: null,
      authIsReady: true,
    });

    render(<SignUp />, { wrapper: MemoryRouter, initialEntries: ['/signup'] });


    expect(screen.queryByTestId('reservation-page')).toBeNull();
    expect(screen.queryByTestId('profile-page')).toBeNull();
    expect(screen.queryByTestId('resetpass-page')).toBeNull();
    expect(screen.queryByTestId('resetpassconfirm-page')).toBeNull();
  });
  test('renders the Reservation page when the route is /reservation/:id', () => {
    useNavigate.mockReturnValue(jest.fn());

    useAuthContext.mockReturnValue({
      user: {
        email: 's@gmail.com',
        id: 2,
        username: 'negar',
        phone_number: '3',
      },
      authIsReady: true,
    });

    render(<Reservation />, { wrapper: MemoryRouter, initialEntries: ['/reservation/123'] });


    expect(screen.getByTestId('reservation-page')).toBeInTheDocument();
    expect(screen.queryByTestId('profile-page')).toBeNull();
    expect(screen.queryByTestId('resetpass-page')).toBeNull();
    expect(screen.queryByTestId('resetpassconfirm-page')).toBeNull();
  });
  test('renders the Reservation page when the route is /reservation/:id', () => {
    useNavigate.mockReturnValue(jest.fn());

    useAuthContext.mockReturnValue({
      user: {
        email: 's@gmail.com',
        id: 2,
        username: 'negar',
        phone_number: '3',
      },
      authIsReady: true,
    });

    render(<Reservation />, { wrapper: MemoryRouter, initialEntries: ['/reservation/123'] });

    expect(screen.queryByTestId('home-page')).toBeNull();
    expect(screen.queryByTestId('login-page')).toBeNull();
    expect(screen.queryByTestId('signup-page')).toBeNull();

  });
  test('renders the Signup page when the route is /signup', () => {
    useNavigate.mockReturnValue(jest.fn());

    useAuthContext.mockReturnValue({
      user: null,
      authIsReady: true,
    });

    render(<SignUp />, { wrapper: MemoryRouter, initialEntries: ['/signup'] });

    expect(screen.queryByTestId('home-page')).toBeNull();
    expect(screen.queryByTestId('login-page')).toBeNull();
    expect(screen.getByTestId('signup-page')).toBeInTheDocument();

  });
  test('renders the Signup page when the route is /signup', () => {
    useNavigate.mockReturnValue(jest.fn());

    useAuthContext.mockReturnValue({
      user: null,
      authIsReady: true,
    });

    render(<SignUp />, { wrapper: MemoryRouter, initialEntries: ['/signup'] });


    expect(screen.queryByTestId('reservation-page')).toBeNull();
    expect(screen.queryByTestId('profile-page')).toBeNull();
    expect(screen.queryByTestId('resetpass-page')).toBeNull();
    expect(screen.queryByTestId('resetpassconfirm-page')).toBeNull();
  });
  test('renders the Reservation page when the route is /reservation/:id', () => {
    useNavigate.mockReturnValue(jest.fn());

    useAuthContext.mockReturnValue({
      user: {
        email: 's@gmail.com',
        id: 2,
        username: 'negar',
        phone_number: '3',
      },
      authIsReady: true,
    });

    render(<Reservation/>, { wrapper: MemoryRouter, initialEntries: ['/reservation/123'] });


    expect(screen.queryByTestId('profile-page')).toBeNull();
    expect(screen.queryByTestId('resetpass-page')).toBeNull();
    expect(screen.queryByTestId('resetpassconfirm-page')).toBeNull();
  });
  test('renders the Reservation page when the route is /reservation/:id', () => {
    useNavigate.mockReturnValue(jest.fn());

    useAuthContext.mockReturnValue({
      user: {
        email: 's@gmail.com',
        id: 2,
        username: 'negar',
        phone_number: '3',
      },
      authIsReady: true,
    });

    render(<Reservation/>, { wrapper: MemoryRouter, initialEntries: ['/reservation/123'] });

    expect(screen.queryByTestId('home-page')).toBeNull();
    expect(screen.queryByTestId('login-page')).toBeNull();
    expect(screen.queryByTestId('signup-page')).toBeNull();
    expect(screen.getByTestId('reservation-page')).toBeInTheDocument();

  });
  test('renders the Profile page when the route is /profile', () => {
    useNavigate.mockReturnValue(jest.fn());

    useAuthContext.mockReturnValue({
      user: {
        email: 's@gmail.com',
        id: 2,
        username: 'negar',
        phone_number: '3',
      },
      authIsReady: true,
    });

    render(<Profile />, { wrapper: MemoryRouter, initialEntries: ['/profile'] });


    expect(screen.queryByTestId('reservation-page')).toBeNull();
    expect(screen.getByTestId('profile-page')).toBeInTheDocument();
    expect(screen.queryByTestId('resetpass-page')).toBeNull();
    expect(screen.queryByTestId('resetpassconfirm-page')).toBeNull();
  });
  test('renders the Profile page when the route is /profile', () => {
    useNavigate.mockReturnValue(jest.fn());

    useAuthContext.mockReturnValue({
      user: {
        email: 's@gmail.com',
        id: 2,
        username: 'negar',
        phone_number: '3',
      },
      authIsReady: true,
    });

    render(<Profile />, { wrapper: MemoryRouter, initialEntries: ['/profile'] });

    expect(screen.queryByTestId('home-page')).toBeNull();
    expect(screen.queryByTestId('login-page')).toBeNull();
    expect(screen.queryByTestId('signup-page')).toBeNull();

  });
  test('renders the ResetPass page when the route is /password/reset', () => {
    useNavigate.mockReturnValue(jest.fn());

    useAuthContext.mockReturnValue({
      user: null,
      authIsReady: true,
    });

    render(<ResetPass />, { wrapper: MemoryRouter, initialEntries: ['/password/reset'] });


    expect(screen.queryByTestId('reservation-page')).toBeNull();
    expect(screen.queryByTestId('profile-page')).toBeNull();
    expect(screen.getByTestId('resetpass-page')).toBeInTheDocument();
    expect(screen.queryByTestId('resetpassconfirm-page')).toBeNull();
  });
  test('renders the ResetPass page when the route is /password/reset', () => {
    useNavigate.mockReturnValue(jest.fn());

    useAuthContext.mockReturnValue({
      user: null,
      authIsReady: true,
    });

    render(<ResetPass />, { wrapper: MemoryRouter, initialEntries: ['/password/reset'] });

    expect(screen.queryByTestId('home-page')).toBeNull();
    expect(screen.queryByTestId('login-page')).toBeNull();
    expect(screen.queryByTestId('signup-page')).toBeNull();

  });
  test('renders the ResetPassConfirm page when the route is /password/reset/confirm/:uid/:token', () => {

    useAuthContext.mockReturnValue({
      user: null,
      authIsReady: true,
    });

    render(<ResetPassConfirm />, { wrapper: MemoryRouter, initialEntries: ['/password/reset/confirm/123/456'] });


    expect(screen.queryByTestId('reservation-page')).toBeNull();
    expect(screen.queryByTestId('profile-page')).toBeNull();
    expect(screen.queryByTestId('resetpass-page')).toBeNull();
    expect(screen.getByTestId('resetpassconfirm-page')).toBeInTheDocument();
  });
  test('renders the ResetPassConfirm page when the route is /password/reset/confirm/:uid/:token', () => {

    useAuthContext.mockReturnValue({
      user: null,
      authIsReady: true,
    });

    render(<ResetPassConfirm />, { wrapper: MemoryRouter, initialEntries: ['/password/reset/confirm/123/456'] });

    expect(screen.queryByTestId('home-page')).toBeNull();
    expect(screen.queryByTestId('login-page')).toBeNull();
    expect(screen.queryByTestId('signup-page')).toBeNull();

  });
});
