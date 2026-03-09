import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface StockData {
  stock: string;
  timestamp: string;
  value: number;
}

interface DataGridState {
  sortColumn: 'stock' | 'timestamp' | 'value';
  sortOrder: 'asc' | 'desc';
  filterStock: 'all' | 'stock1' | 'stock2';
  dummyData: StockData[];
}

const initialState: DataGridState = {
  sortColumn: 'timestamp',
  sortOrder: 'desc',
  filterStock: 'all',
  dummyData: [],
};

const dataGridSlice = createSlice({
  name: 'dataGrid',
  initialState,
  reducers: {
    setSortColumn: (state, action: PayloadAction<'stock' | 'timestamp' | 'value'>) => {
      state.sortColumn = action.payload;
    },
    setSortOrder: (state, action: PayloadAction<'asc' | 'desc'>) => {
      state.sortOrder = action.payload;
    },
    setFilterStock: (state, action: PayloadAction<'all' | 'stock1' | 'stock2'>) => {
      state.filterStock = action.payload;
    },
    setDummyData: (state, action: PayloadAction<StockData[]>) => {
      state.dummyData = action.payload;
    },
  },
});

export const { setSortColumn, setSortOrder, setFilterStock, setDummyData } = dataGridSlice.actions;
export default dataGridSlice.reducer;