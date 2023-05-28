import { render, screen, fireEvent } from '@testing-library/react';
import Payment from './Payment';
import { useFetch } from '../hooks/useFetch';

jest.mock('../hooks/useFetch', () => ({
    useFetch: jest.fn(),
  }));

const payment = {
    price: 10,
  }
describe('Payment', () => {
    beforeEach(() => {
        useFetch.mockReturnValue({
            data: payment,
            isPending: false,
            error: null,
        });
    });
  test('renders payment modal with service price', () => {
    const serv_id = 1;
    const setPayCode = jest.fn();

    render(
      <Payment
        serv_id={serv_id}
        handleReserve={() => {}}
        setPayCode={setPayCode}
        pay_code=""
      />
    );

    fireEvent.click(screen.getByRole('button', { name: 'Payment' }));

    expect(screen.queryByRole('heading')).toBeInTheDocument();
    expect(screen.getByText(payment.price)).toBeInTheDocument();
    expect(screen.getByText('accept')).toBeInTheDocument();
  });

  test('calls handleReserve and setPayCode when buttons are clicked', () => {
    const serv_id = 1;
    const handleReserve = jest.fn();
    const setPayCode = jest.fn();

    render(
      <Payment
        serv_id={serv_id}
        handleReserve={handleReserve}
        setPayCode={setPayCode}
        pay_code=""
      />
    );

    fireEvent.click(screen.getByRole('button', { name: 'Payment' }));
    fireEvent.click(screen.getByRole('button', { name: 'accept' }));

    expect(handleReserve).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByRole('button', { name: 'Payment' }));
    fireEvent.click(screen.getByRole('button', { name: 'decline' }));

    expect(handleReserve).toHaveBeenCalledTimes(1); // handleReserve should not be called again
  });

  test('calls setPayCode on input change', () => {
    const serv_id = 1;
    const setPayCode = jest.fn();

    render(
      <Payment
        serv_id={serv_id}
        handleReserve={() => {}}
        setPayCode={setPayCode}
        pay_code=""
      />
    );

    fireEvent.click(screen.getByRole('button', { name: 'Payment' }));

    const input = screen.getByPlaceholderText('Enter payment code');
    fireEvent.change(input, { target: { value: '123456' } });

    expect(setPayCode).toHaveBeenCalledTimes(1);
    expect(setPayCode).toHaveBeenCalledWith('123456');
  });
});
