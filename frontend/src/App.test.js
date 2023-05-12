//https://testing-library.com/docs/react-testing-library
import { render, screen } from './testUtils';
import App from './App';

test('signup', () => {
  render(<App />);
  const linkElement = screen.getByText('ثبت نام');
  expect(linkElement).toBeInTheDocument();
});
test('logo', () => {
  render(<App />);
  const linkElement = screen.getByText(('بیمارستان'));
  expect(linkElement).toBeInTheDocument();
});
