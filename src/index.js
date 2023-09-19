import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Redux
import { Provider } from 'react-redux';
import store from './redux/store.js';

// React query
import { QueryClient, QueryClientProvider } from 'react-query';

// i18n
import './utils/i18n';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>,
);
