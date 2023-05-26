import React from 'react';
import { render, screen } from '@testing-library/react';
import ShowItem from './ShowItem';
import { useFetch } from '../hooks/useFetch';
jest.mock('../hooks/useFetch')
const mockItem =
{
    "id": 1,
    "category": "dentist",
    "name": "lase",
    "description": "tarmim lase",
    "image": null,
    "experience": '10 years',
    "phone_number": '0912389933',
    "last_name": "moqim",
    "first_name": "neda"
}
describe('ShowItem', () => {
    // Mock the useFetch hook
    beforeEach(() => {
        useFetch.mockReturnValue({
            data: mockItem,
            isPending: false,
            error: null,
        });
    });
    const mockItemId = 1;

    test('renders item details', () => {
        render(<ShowItem doc_id={mockItemId} />);

        // Assertions
        expect(screen.getByText(mockItem.name)).toBeInTheDocument();
        expect(screen.getByAltText('تصویری برای این سرویس در دسترس نیست')).toBeInTheDocument();
        expect(screen.getByText(`Dr.${mockItem.last_name}`)).toBeInTheDocument();
        expect(screen.getByText(mockItem.category)).toBeInTheDocument();
        expect(screen.getByText(mockItem.description)).toBeInTheDocument();
        expect(screen.getByText(mockItem.experience)).toBeInTheDocument();
        expect(screen.getByText(mockItem.phone_number)).toBeInTheDocument();
    });
});
