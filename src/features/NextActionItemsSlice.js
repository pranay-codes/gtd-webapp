// src/features/nextActionItemsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchNextActionItems } from '../services/api';

export const fetchItems = createAsyncThunk(
  'nextActionItems/fetchItems',
  async () => {
    const response = await fetchNextActionItems();
    return response.data;
  }
);

const nextActionItemsSlice = createSlice({
  name: 'nextActionItems',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchItems.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default nextActionItemsSlice.reducer;
