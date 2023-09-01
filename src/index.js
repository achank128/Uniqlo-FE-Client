import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AppProvider } from './context/context';
import { Provider } from 'react-redux';
import store from './store/store.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </AppProvider>
  </React.StrictMode>,
);
