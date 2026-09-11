import { createSlice } from '@reduxjs/toolkit';

/**
 * Counter Slice for Redux Toolkit (Issue #63 & #64)
 * 
 * Demonstrates:
 * 1. `createSlice`: Automatically generates action creators and action types.
 * 2. Immer Integration: RTK uses Immer internally, allowing "mutative" syntax (state.value += 1)
 *    safely without violating immutability.
 * 3. Selectors: Reusable functions that extract and derive data from the global store.
 */
const initialState = {
  value: 10,
  history: [],
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
      state.history.push(`Incremented to ${state.value}`);
    },
    decrement: (state) => {
      state.value -= 1;
      state.history.push(`Decremented to ${state.value}`);
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
      state.history.push(`Added ${action.payload} -> ${state.value}`);
    },
    resetCounter: (state) => {
      state.value = 0;
      state.history = ['Counter reset to 0'];
    },
  },
});

export const { increment, decrement, incrementByAmount, resetCounter } = counterSlice.actions;

// Selectors (Issue #64)
export const selectCounterValue = (state) => state.counter.value;
export const selectCounterHistory = (state) => state.counter.history;
export const selectCounterStatus = (state) => {
  const val = state.counter.value;
  if (val >= 20) return { message: 'High Value Threshold Achieved! 🚀', badge: 'bg-emerald-100 text-emerald-800' };
  if (val < 0) return { message: 'Negative Value Alert! ⚠️', badge: 'bg-rose-100 text-rose-800' };
  return { message: 'Normal Operating Range 👍', badge: 'bg-blue-100 text-blue-800' };
};

export default counterSlice.reducer;
