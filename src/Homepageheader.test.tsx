import React from 'react';
import { render, screen } from '@testing-library/react';
import HomepageHeader from './HomepageHeader';

test('renders learn react link', () => {
  render(<HomepageHeader />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
