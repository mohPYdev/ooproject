import React from 'react';
import { render, screen } from '@testing-library/react';
import Reservation from './Reservation';
import { MemoryRouter } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
// Mock the useFetch custom hook
jest.mock('../hooks/useFetch')

describe('Reservation', () => {
    beforeEach(() => {
        useFetch.mockReturnValue({
            data: null,
            isPending: false,
            error: null,
        });
    });

    test('renders the reservation component without data', () => {
        render(<MemoryRouter><Reservation /></MemoryRouter>);

        // Assert that the service cards are not rendered
        const serviceCards = screen.queryByTestId('service-card');
        expect(serviceCards).toBe(null);

        // Assert that the pagination component is rendered
        const pagination = screen.getByTestId('pagination');
        expect(pagination).toBeInTheDocument();
    });
    test('renders the reservation component with data', async () => {
        useFetch.mockReturnValue({
            data: {
                "count": 1,
                "next": null,
                "previous": null,
                "results": [{
                    "id": 4,
                    "start_date": "2023-06-02T11:17:52+03:30",
                    "end_date": "2023-06-02T13:18:01+03:30",
                    "repeat": "do not repeat",
                    "shift": 3,
                    "services": [1],
                    "item": 1,
                    "is_available": true
                }],
            },
            // data:[{"start":"2023-06-02T07:47:52Z"}],

            isPending: false,
            error: null,
        });
    })
});
