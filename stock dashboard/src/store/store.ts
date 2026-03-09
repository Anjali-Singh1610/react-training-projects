import { configureStore } from '@reduxjs/toolkit';
import stockReducer from './slices/stockSlice';
import dataGridReducer from './slices/dataGridSlice';

export const store = configureStore({
  reducer: {
    stock: stockReducer,
    dataGrid: dataGridReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;