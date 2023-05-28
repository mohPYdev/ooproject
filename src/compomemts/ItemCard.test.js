import { render, screen } from '@testing-library/react';
import Itemcard from './Itemcard';
import { AuthContext } from '../context/AuthContext';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';

jest.mock('../hooks/useFetch', () => ({
    useFetch: jest.fn(),
  }));
// jest.mock('../hooks/useFetch', () => ({
//   useFetch: jest.fn(() => ({
//     data: {
//       name: 'Service Name',
//       subtitle: 'Service Type',
//       price: 10,
//       duration: '1 hour',
//     },
//     isPending: false,
//     error: null,
//   })),
// }));
const service ={
    name: 'سرویس ترمیم لثه',
    subtitle: 'دندان پزشکی',
    price: 10,
    duration: '1 hour',
  }
describe('Itemcard', () => {
    beforeEach(() => {
        useFetch.mockReturnValue({
            data: service,
            isPending: false,
            error: null,
        });
    });
  test('renders service information', () => {
    useFetch.mockReturnValue({
        data: service,
          isPending: false,
          error: null,
        });
    const id = 1;

    // render(<Itemcard id={id} />, {
    //     // Provide a custom context value for useAuthContext
    //     // to mock the user data
    //     wrapper: ({ children }) => (
    //         <AuthContext.Provider value={{ data }}>{children}</AuthContext.Provider>
    //     ),
    // });
    render(<MemoryRouter><Itemcard /></MemoryRouter>);
    expect(screen.getByText(service.name)).toBeInTheDocument();
    expect(screen.getByText(service.subtitle)).toBeInTheDocument();
    expect(screen.getByText(service.price)).toBeInTheDocument();
    expect(screen.getByText(service.duration)).toBeInTheDocument();
  });

  test('renders "انتخاب" button with correct link', () => {
    const id = 1;
    const data = {
        name: 'سرویس ترمیم لثه',
        subtitle: 'دندان پزشکی',
        price: 10,
        duration: '1 hour',
      }
    render(<Itemcard id={id} />, {
        // Provide a custom context value for useAuthContext
        // to mock the user data
        wrapper: ({ children }) => (
            <AuthContext.Provider value={{ data }}>{children}</AuthContext.Provider>
        ),
    });

    // const link = screen.getByRole('link', { name: 'انتخاب' });
    // expect(link).toBeInTheDocument();
    // expect(link.getAttribute('href')).toBe(`/reservation/${id}`);
  });
});
