import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://wallet.goit.ua/api/';

export const getTransactions = createAsyncThunk(
  'transactions/fetchAll',
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get('/transactions');
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message[0]);
    }
  }
);

export const addTransaction = createAsyncThunk(
  'transactions/addTransaction',
  async (transactionDetails, thunkAPI) => {
    try {
      const { data } = await axios.post('/transactions', transactionDetails);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message[0]);
    }
  }
);

export const deleteTransaction = createAsyncThunk(
  'transactions/deleteTransaction',
  async (transactionId, thunkAPI) => {
    try {
      const { data } = await axios.delete(`/transactions/${transactionId}`);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message[0]);
    }
  }
);

export const editTransaction = createAsyncThunk(
  'transactions/editTransaction',
  async ({ transactionID, newTransaction }, thunkAPI) => {
    try {
      const { data } = await axios.patch(
        `/transactions/${transactionID}`,
        newTransaction
      );
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message[0]);
    }
  }
);

export const getCategories = createAsyncThunk(
  'transactions/getCategories',
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get('/transaction-categories');
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message[0]);
    }
  }
);
