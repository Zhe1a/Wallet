import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'components/App/App';
import './index.css';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import './stylesheet/fonts.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter basename="/Wallet">
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </BrowserRouter>
  </Provider>
);
