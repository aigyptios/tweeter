import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders Tweeter text', () => {
  render(<App />);
  const linkElement = screen.getByText(/Tweeter/i);
  expect(linkElement).toBeInTheDocument();
});
