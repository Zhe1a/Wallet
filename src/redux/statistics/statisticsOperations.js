import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://wallet.goit.ua/api/';
export const getTransactionsSummary = createAsyncThunk(
  'transactions-summary-time',
  async (data, thunkAPI) => {
    const { month, year } = data;
    try {
      const { data } = await axios.get(`transactions-summary`, {
        params:
          !month && !year
            ? {}
            : !month
            ? {
                year,
              }
            : !year
            ? {
                month,
              }
            : {
                month,
                year,
              },
      });
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
