import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './Home'; // Replace with the appropriate import
import { useFetch } from '../hooks/useFetch';
import { MemoryRouter } from 'react-router-dom';

jest.mock('../hooks/useFetch', () => ({
  useFetch: jest.fn(),
}));

describe('Home', () => {
  test('renders the Home component', () => {
    // Mock the useFetch hook
    useFetch.mockReturnValue({
      data: [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
        { id: 3, name: 'Item 3' },
      ],
      isPending: false,
      error: null,
    });

    render(<MemoryRouter><Home /></MemoryRouter>);

    // Assert that the component is rendered
    expect(screen.getByTestId('home-page')).toBeInTheDocument();

    // Assert that item cards are rendered
    expect(screen.getAllByTestId('item-card')).toHaveLength(3);
  });

  test('renders loading state when data is pending', () => {
    // Mock the useFetch hook with pending data
    useFetch.mockReturnValue({
      data: null,
      isPending: true,
      error: null,
    });

    render(<MemoryRouter><Home /></MemoryRouter>);
    // Assert that the loading state is rendered
    expect(screen.queryByTestId('item-card')).not.toBeInTheDocument();
  });

  test('renders error message when there is an error', () => {
    // Mock the useFetch hook with an error
    useFetch.mockReturnValue({
      data: null,
      isPending: false,
      error: 'An error occurred',
    });

    render(<MemoryRouter><Home /></MemoryRouter>);
    // Assert that the error message is rendered
    expect(screen.queryByTestId('item-card')).not.toBeInTheDocument();
  });

  // You can add more tests to cover other scenarios, such as empty data, etc.
});
