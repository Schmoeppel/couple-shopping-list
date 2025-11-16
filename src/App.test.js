import { render, screen } from '@testing-library/react';
import App from './App';

// Mock Firebase modules
jest.mock('./firebase', () => ({
  auth: {},
  database: {}
}));

jest.mock('firebase/auth', () => ({
  onAuthStateChanged: (auth, callback) => {
    return jest.fn(); // Return mock unsubscribe function
  }
}));

test('renders app component', () => {
  render(<App />);
  // Just verify the app renders without crashing
  expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
});
