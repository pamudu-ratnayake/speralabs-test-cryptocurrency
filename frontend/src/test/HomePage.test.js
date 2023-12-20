import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from './HomePage';
import axios from 'axios';

jest.mock('axios');

const mockCoins = [/* ... */];

test('fetches and renders coins', async () => {
  axios.get.mockResolvedValue({ data: mockCoins });

  render(<HomePage />);

  await screen.findByText(mockCoins[0].name);
  expect(axios.get).toHaveBeenCalledTimes(1);
});
