import { configureStore } from '@reduxjs/toolkit';
import nextActionItemsReducer, { fetchItems } from './NextActionItemsSlice';
import * as api from '../services/api';

jest.mock('../services/api');

describe('nextActionItemsSlice', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        nextActionItems: nextActionItemsReducer,
      },
    });
  });

  test('should handle initial state', () => {
    const state = store.getState().nextActionItems;
    expect(state).toEqual({
      items: [],
      loading: false,
      error: null,
    });
  });

  test('should handle fetchItems.pending', () => {
    store.dispatch(fetchItems.pending());
    const state = store.getState().nextActionItems;
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('should handle fetchItems.fulfilled', async () => {
    const mockData = [
      {
        id: 1,
        title: 'Item 1',
        dueDate: '2024-08-21',
        context: 'Work',
        details: 'Details about Item 1',
      },
    ];
    api.fetchNextActionItems.mockResolvedValueOnce({ data: mockData });

    await store.dispatch(fetchItems());

    const state = store.getState().nextActionItems;
    expect(state.loading).toBe(false);
    expect(state.items).toEqual(mockData);
    expect(state.error).toBeNull();
  });

  test('should handle fetchItems.rejected', async () => {
    const mockError = new Error('Failed to fetch');
    api.fetchNextActionItems.mockRejectedValueOnce(mockError);

    await store.dispatch(fetchItems());

    const state = store.getState().nextActionItems;
    expect(state.loading).toBe(false);
    expect(state.items).toEqual([]);
    expect(state.error).toBe(mockError.message);
  });
});
