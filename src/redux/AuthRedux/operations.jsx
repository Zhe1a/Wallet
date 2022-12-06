import { createAsyncThunk } from '@reduxjs/toolkit/dist';
import axios from 'axios';

axios.defaults.baseURL = 'https://wallet.goit.ua/api/';

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

export const LoginApi = createAsyncThunk(
  'auth/login',
  async (sign, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('auth/sign-in', sign);
      token.set(data.token);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const RegisterApi = createAsyncThunk(
  'auth/register',
  async (sing, { rejectWithValue }) => {
    console.log(sing);
    try {
      const { data } = await axios.post('auth/sign-up', sing);
      token.set(data.token);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const ResetApi = createAsyncThunk(
  'auth/Signout',
  async (_, { rejectWithValue }) => {
    try {
    await axios.delete('auth/sign-out');
      token.unset();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCurrentUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue();
    }
    token.set(persistedToken);
    try {
      const { data } = await axios.get('users/current');
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const refreshBalance = createAsyncThunk(
  'auth/refreshBalance',
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get('users/current');
      return data.balance;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

