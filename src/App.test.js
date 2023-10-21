import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { screen } from '@testing-library/react';

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
