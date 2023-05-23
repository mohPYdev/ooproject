import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthContextProvider } from './context/AuthContext'
test('renders the App component', () => {
  render(
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  );

  // Assert that the Navbarc component is rendered
  expect(screen.getByRole('navigation')).toBeInTheDocument();

  // You can add more assertions here to test other components and routes
});
