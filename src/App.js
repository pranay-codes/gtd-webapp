// src/App.js
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './Store';
import NextActionItemsPage from './pages/NextActionItemPage';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <NextActionItemsPage />
      </div>
    </Provider>
  );
}

export default App;
