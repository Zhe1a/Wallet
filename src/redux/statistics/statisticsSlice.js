import { createSlice } from '@reduxjs/toolkit';
import { getTransactionsSummary } from './statisticsOperations';

const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};
const handleFulfiled = (state, { payload }) => {
  state.error = null;
  state.isLoading = false;
  state.categoriesSummary = payload.categoriesSummary;
  state.incomeSummary = payload.incomeSummary;
  state.expenseSummary = payload.expenseSummary;
  state.periodTotal = payload.periodTotal;
  state.year = payload.year;
  state.month = payload.month;
};
const statisticsSlice = createSlice({
  name: 'statistics',
  initialState: {
    categoriesSummary: [],
    incomeSummary: null,
    expenseSummary: null,
    periodTotal: null,
    year: null,
    month: null,
    error: null,
    isLoading: false,
  },
  extraReducers: {
    [getTransactionsSummary.pending]: handlePending,
    [getTransactionsSummary.rejected]: handleRejected,
    [getTransactionsSummary.fulfilled]: handleFulfiled,
  },
});

export const statisticsReducer = statisticsSlice.reducer;
