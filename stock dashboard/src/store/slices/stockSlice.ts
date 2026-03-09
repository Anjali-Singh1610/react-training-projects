import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface StockState {
  stock1Price: number;
  stock2Price: number;
  stock1Data: { time: number; price: number }[];
  stock2Data: { time: number; price: number }[];
}

const initialState: StockState = {
  stock1Price: 100,
  stock2Price: 200,
  stock1Data: [{ time: 0, price: 100 }],
  stock2Data: [{ time: 0, price: 200 }],
};

const stockSlice = createSlice({
  name: 'stock',
  initialState,
  reducers: {
    updateStock1Price: (state, action: PayloadAction<number>) => {
      state.stock1Price = action.payload;
      state.stock1Data = [...state.stock1Data.slice(-9), { time: state.stock1Data.length, price: action.payload }];
    },
    updateStock2Price: (state, action: PayloadAction<number>) => {
      state.stock2Price = action.payload;
      state.stock2Data = [...state.stock2Data.slice(-9), { time: state.stock2Data.length, price: action.payload }];
    },
  },
});

export const { updateStock1Price, updateStock2Price } = stockSlice.actions;
export default stockSlice.reducer;