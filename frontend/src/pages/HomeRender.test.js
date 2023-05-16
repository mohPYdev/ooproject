import React from 'react';
import { render, screen, fireEvent,waitFor, getNodeText, getAllByAltText, getByLabelText, getByTestId } from '../testUtils';
import Home from './Home';
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import { MemoryRouter } from "react-router-dom";
describe('Home', () => {
  test('renders without crashing', () => {
    render(<Home />);
  });

//   test('fetches data from correct endpoint', async () => {
//     const {  } = render(<MemoryRouter ><Home /></MemoryRouter>);
//     items_list = await screen.getByTestId('item-card')
//     expect(items_list).toHaveLength(0)
//   });
//   test('displays correct number of items', async () => {
//     const { getByText } = render(<Home />);
//     await waitFor(() => getByText('Loading...'));
//     await waitFor(() => getByText('Item 1'));
//     expect(getByText('Item 1')).toBeInTheDocument();
//     expect(getByText('Item 2')).toBeInTheDocument();
//     expect(getByText('Item 3')).toBeInTheDocument();
//   });

//   test('displays correct item details', async () => {
//     const { getByText } = render(<Home />);
//     await waitFor(() => getByText('Loading...'));
//     await waitFor(() => getByText('Item 1'));
//     expect(getByText('Item 1')).toHaveAttribute('id', '1');
//     expect(getByText('Item 1')).toHaveClass('col-md-4');
//   });

//   test('handles errors correctly', async () => {
//     fetch.mockRejectedValueOnce(new Error('Server error'));
//     const { getByText } = render(<Home />);
//     await waitFor(() => getByText('Loading...'));
//     await waitFor(() => getByText('Error: Server error'));
//     expect(getByText('Error: Server error')).toBeInTheDocument();
//   });

//   test('handles loading state correctly', async () => {
//     const { getByText } = render(<Home />);
//     expect(getByText('Loading...')).toBeInTheDocument();
//     await waitFor(() => getByText('Item 1'));
//     expect(getByText('Loading...')).not.toBeInTheDocument();
//   });
});