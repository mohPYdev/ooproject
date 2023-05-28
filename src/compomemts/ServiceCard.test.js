import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ServiceCard from './ServiceCard';

test('renders service card correctly', () => {
    const mockShift = {
        "id": 4,
        "start_date": "2023-06-02T12:10:44+03:30",
        "end_date": "2023-06-03T12:10:46+03:30",
        "repeat": "every week",
        "shift": 3,
        "services": [1],
        "item": 1,
        "is_available": true
    };

    const mockServId = 4;

    render(
        <MemoryRouter>
            <ServiceCard shift={mockShift} serv_id={mockServId} />
        </MemoryRouter>
    );

    // Assert that the item details are rendered correctly
    expect(screen.getByText(': پزشک')).toBeInTheDocument();

    // Assert that the availability status is rendered correctly
    expect(screen.getByText('در دسترس')).toBeInTheDocument();

    // Assert that the select time component is rendered
    expect(screen.getByRole('button', { name: 'انتخاب زمان' })).toBeInTheDocument();

    // Simulate a click on the select time button
    fireEvent.click(screen.getByRole('button', { name: 'انتخاب زمان' }));



    //check for the modal is open correctly
    expect(screen.getByText('زمان های در دسترس')).toBeInTheDocument();

});
