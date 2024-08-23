// src/App.test.js
import React from 'react';
import { screen, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './Store';
import App from './App';
import '@testing-library/jest-dom';

describe('App Component', () => {
  it('renders NextActionItemsPage inside the Redux Provider', () => {
    // Render the App component
    const { getByText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    // Check if the NextActionItemsPage content is rendered
    // Assuming NextActionItemsPage has a title or some specific text
    // eslint-disable-next-line no-restricted-globals
    expect(screen.getByText('Next Action Items')).toBeInTheDocument();
  });
});
