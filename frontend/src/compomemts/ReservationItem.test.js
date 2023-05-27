import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ReservationItem from './ReservationItem'; // Replace with the appropriate import
import { useFetch } from '../hooks/useFetch';

jest.mock('../hooks/useFetch')

describe('ReservationItem', () => {
    beforeEach(() => {
        useFetch.mockReturnValue({
            // data: { first_name: 'John', last_name: 'Doe', category: 'Category' },
            data: { name: 'Service', duration: '01:30:00' },
            isPending: false,
            error: null,
        });
    });
    test('renders the reservation item', () => {
        const deleteItem = jest.fn();

      // Mock the useFetch hook for each API call
      useFetch
        .mockReturnValueOnce({
          data: { first_name: 'John', last_name: 'Doe', category: 'Category' },
        })
        .mockReturnValueOnce({ data: { name: 'Service', duration: '01:30:00' } })
        // .mockReturnValueOnce({ data: { name: 'Shift' } });

      render(<ReservationItem res_id={1} doc_id={1} shift_id={1} service_id={1} time_date="2022-01-01T12:00:00" deleteItem={deleteItem}/>);

      // Assert that the component is rendered
      expect(screen.getByTestId('reservation-item')).toBeInTheDocument();

      // Assert that the item information is rendered correctly
    //   expect(screen.getByText('John Doe')).toBeInTheDocument();
    //   expect(screen.getByText('Category')).toBeInTheDocument();
      expect(screen.getByText('Service')).toBeInTheDocument();
      expect(screen.getByText('01:30 hours')).toBeInTheDocument();
      expect(screen.getByText('12:00 PM')).toBeInTheDocument();
      expect(screen.getByText('Saturday, January 1')).toBeInTheDocument();
    //   expect(screen.getByText('Accepted')).toBeInTheDocument();

      // Assert that the delete button is rendered
    //   expect(screen.getByRole('button')).toBeInTheDocument();
    });

    test('handles delete button click', () => {
      const deleteItem = jest.fn();
      useFetch
        // .mockReturnValueOnce({
        //   data: { first_name: 'John', last_name: 'Doe', category: 'Category' },
        // })
        .mockReturnValueOnce({ data: { name: 'Service', duration: '01:30:00' } })
        // .mockReturnValueOnce({ data: { name: 'Shift' } });

      render(<ReservationItem res_id={1} doc_id={1} shift_id={1} service_id={1} time_date="2022-01-01T12:00:00" deleteItem={deleteItem} />);

      // Click the delete button
    //   fireEvent.click(screen.getByRole('button'));

      // Assert that the delete function is called
      expect(deleteItem).toHaveBeenCalledTimes(1);
      expect(deleteItem).toHaveBeenCalledWith(1); // Replace with the appropriate argument for your deleteItem function
    });
  });
