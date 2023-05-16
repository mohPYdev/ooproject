import React from 'react';
import { render, screen, fireEvent, waitFor, getNodeText, getAllByAltText, getByLabelText, getByTestId } from '../testUtils';
import Login from './Login';
import { MemoryRouter } from "react-router-dom";
describe('Login', () => {
    test('renders without crashing', () => {
        render(<MemoryRouter ><Login /></MemoryRouter>);
    });
    // test('login button', async() => {

    //     const handleSubmit = jest.fn();
    //     const { } = render(<MemoryRouter ><Login onSubmit={handleSubmit} /></MemoryRouter>);
    //     const loginButton = screen.getByRole("button");
        // await fireEvent.click(loginButton)
    //     expect(handleSubmit).toBeCalledTimes(1)
    // })

})