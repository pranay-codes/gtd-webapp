import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import nextActionItemsReducer from '../features/NextActionItemsSlice';
import NextActionItemsTable from './NextActionItemTable';

// Mock data for testing
const mockItems = [
  {
    id: 1,
    title: 'Item 1',
    dueDate: '2024-08-21',
    context: 'Work',
    details: 'Details about Item 1',
  },
  {
    id: 2,
    title: 'Item 2',
    dueDate: '2024-08-22',
    context: 'Home',
    details: 'Details about Item 2',
  },
  // Add more mock items as needed
];

// Utility to render the component with the Redux store
const renderWithProvider = (ui, { store }) =>
  render(<Provider store={store}>{ui}</Provider>);

describe('NextActionItemsTable', () => {
  let store;

  beforeEach(() => {
    // Create a test store with the mock data
    store = configureStore({
      reducer: {
        nextActionItems: nextActionItemsReducer,
      },
      preloadedState: {
        nextActionItems: {
          items: mockItems,
        },
      },
    });
  });

  test('renders the table with the correct headers', () => {
    renderWithProvider(<NextActionItemsTable />, { store });

    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Due Date')).toBeInTheDocument();
    expect(screen.getByText('Context')).toBeInTheDocument();
    expect(screen.getByText('Details')).toBeInTheDocument();
  });

  test('renders the correct number of rows based on items and pagination', () => {
    renderWithProvider(<NextActionItemsTable />, { store });

    const rows = screen.getAllByRole('row');
    // Expect 3 rows: 1 header row and 2 data rows
    expect(rows.length).toBe(3); // Adjust this based on your mock data
  });

  test('sorts items when clicking on headers', () => {
    renderWithProvider(<NextActionItemsTable />, { store });

    // Click on "Title" to sort by title
    fireEvent.click(screen.getByText('Title'));

    const firstRow = screen.getAllByRole('row')[1];
    expect(firstRow).toHaveTextContent('Item 2'); // Adjust based on the expected sorted order
  });
});
