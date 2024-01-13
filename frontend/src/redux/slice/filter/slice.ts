import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { FilterSliceState } from './types';

const initialState: FilterSliceState = {
  searchValue: '',
  categoryId: 0,
  sortId: 0,
  asc: true,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSortId(state, action: PayloadAction<number>) {
      state.sortId = action.payload;
    },
    setAsc(state) {
      state.asc = !state.asc;
    },
    setFilters(state, action) {
      state.sortId = Number(action.payload.sortId);
      state.asc = action.payload.asc === 'false' ? false : true;
    },
  },
});

export const { setSearchValue, setCategoryId, setSortId, setAsc, setFilters } = filterSlice.actions;
export default filterSlice.reducer;