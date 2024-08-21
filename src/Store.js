// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import nextActionItemsReducer from './features/NextActionItemsSlice';

export const store = configureStore({
  reducer: {
    nextActionItems: nextActionItemsReducer,
  },
});
