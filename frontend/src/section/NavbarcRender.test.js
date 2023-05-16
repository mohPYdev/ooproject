import { render, screen, fireEvent, getByTestId } from '../testUtils';
import Navbarc from './Navbarc';
import { MemoryRouter } from "react-router-dom";

// import user from '@testing-library/user-event'

describe('Navbar', () => {
    test('renders  component without crashing', () => {
        render(<MemoryRouter ><Navbarc /></MemoryRouter>);
    });
    // Scenario 2 - Test if the Navbar component is rendered:


    test('renders component', () => {
        const { getByRole } = render(<MemoryRouter ><Navbarc /></MemoryRouter>);
        const navbar = getByRole('navigation');
        expect(navbar).toBeInTheDocument();
    });
    // Scenario 3 - Test if the Navbar.Brand component is rendered when the user is not logged in:


    test('renders Navbar.Brand component when user is not logged in', () => {
        const { getByText } = render(<MemoryRouter ><Navbarc isLoggedIn={false} /></MemoryRouter>);
        const brand = getByText('بیمارستان');
        expect(brand).toBeInTheDocument();
    });
    // Scenario 4 - Test if the Nav.Link components are rendered based on the user's authentication status:
    test('renders Nav.Link components based on user authentication status', () => {
        const { getByText, queryByText } = render(<MemoryRouter ><Navbarc isLoggedIn={false} /></MemoryRouter>);
        const homeLink = queryByText('Home');
        const loginLink = getByText('ورود');
        expect(homeLink).not.toBeInTheDocument();
        expect(loginLink).toBeInTheDocument();
    });
    // test('calls handleClick function when Logout button is clicked', async () => {
    //     // user.setup()
    //     const handleClick = jest.fn();
    //     const {  } = render(<MemoryRouter ><Navbarc isLoggedIn={true} handleClick={handleClick} /></MemoryRouter>);
    //     const logoutButton = screen.getByRole("Nav.Link");
    //     await user.click(logoutButton);
    //     expect(handleClick).toHaveBeenCalledTimes(1);
    //   });


})
