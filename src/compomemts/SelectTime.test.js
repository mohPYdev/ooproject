import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SelectTime from './SelectTime';
import { useFetch } from '../hooks/useFetch';

const mockFreeTimes = [{ "start": "2023-06-02T08:40:44Z" }, { "start": "2023-06-02T09:55:44Z" }, { "start": "2023-06-02T11:10:44Z" }, { "start": "2023-06-02T12:25:44Z" }, { "start": "2023-06-02T13:40:44Z" }, { "start": "2023-06-02T14:55:44Z" }, { "start": "2023-06-02T16:10:44Z" }, { "start": "2023-06-02T17:25:44Z" }, { "start": "2023-06-02T18:40:44Z" }, { "start": "2023-06-02T19:55:44Z" }, { "start": "2023-06-02T21:10:44Z" }, { "start": "2023-06-02T22:25:44Z" }, { "start": "2023-06-02T23:40:44Z" }, { "start": "2023-06-03T00:55:44Z" }, { "start": "2023-06-03T02:10:44Z" }, { "start": "2023-06-03T03:25:44Z" }, { "start": "2023-06-03T04:40:44Z" }, { "start": "2023-06-03T05:55:44Z" }, { "start": "2023-06-03T07:10:44Z" }]
const mockId = 4
const mockServiceId = 1

// Mock the useFetch hook
jest.mock('../hooks/useFetch')
describe('SelectTime', () => {
    beforeEach(() => {
        useFetch.mockReturnValue({
            data: mockFreeTimes,
            isPending: false,
            error: null,
        });
    });
    test('renders SelectTime component', () => {
        const mockSetTime = jest.fn();
        const mockSetTimePicked = jest.fn();
        const mockSetIsFull = jest.fn();

        render(
            <SelectTime
                id={mockId}
                service_id={mockServiceId}
                setTime={mockSetTime}
                setTimePicked={mockSetTimePicked}
                setIsFull={mockSetIsFull}
            />
        );

        // Test button click to show the modal
        const button = screen.getByText('انتخاب زمان');
        fireEvent.click(button);
        expect(screen.getByText('زمان های در دسترس')).toBeInTheDocument();


        //check for showing all free times
        const free_times = screen.getAllByTestId('free-times')
        expect(free_times).toHaveLength(mockFreeTimes.length)


        // Test selecting a time from the modal
        const time_buttons = screen.getAllByTestId('free-times');
        time_buttons.forEach((button) => {
            fireEvent.click(button);
            // Perform assertions based on the button click
            // ...
          });


        // Test when there's only one available time
        // Modify the mockFreeTimes data to have a single time
        // Render the component again and assert the behavior
    });
})