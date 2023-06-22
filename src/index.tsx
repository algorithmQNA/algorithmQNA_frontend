import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';

if (process.env.NODE_ENV === 'development' && process.env.REACT_APP_MOCK) {
  const { worker } = require('./mocks/browser');
  worker.start({ onUnhandledRequest: 'bypass' });
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      onError: (err) => {
        console.log(err);
      },
      staleTime: 0.5 * 60 * 1000,
      retry: false,
    },
  },
});

root.render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <App />
      </RecoilRoot>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  </BrowserRouter>
);
