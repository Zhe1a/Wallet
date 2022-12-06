import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './AuthRedux/AuthSlice';
import { transactionsReducer } from './transactions/transactions-slice';

// const authSlice = createSlice({
//   name: 'auth',
//   initialState: {
//     isLoggedIn: false,
//   },
//   extraReducers: {

//   },
// });
// authSlice.reducer,
// export const getIsLoggedIn = state => state.auth.isLoggedIn;

import storage from 'redux-persist/lib/storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { statisticsReducer } from './statistics/statisticsSlice';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};
const persistedReducer = persistReducer(authPersistConfig, authSlice);
export const store = configureStore({
  reducer: {
    auth: persistedReducer,
    transactions: transactionsReducer,
    statistics: statisticsReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
