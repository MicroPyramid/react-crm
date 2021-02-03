import React from 'react';
import { render } from '@testing-library/react';
import Login from './auth/Login';

test('renders bottlecrm link', () => {
    const { queryAllByText } = render(<Login />);
    const linkElement = queryAllByText(/bottlecrm/i);
    expect(linkElement).toBeInTheDocument();
});
