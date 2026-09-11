import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';

/**
 * Central Redux Store Configuration (Issue #63)
 * Combines all slice reducers and enables Redux DevTools automatically.
 */
export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
