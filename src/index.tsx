import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';
import {BrowserRouter} from "react-router-dom";

if (process.env.NODE_ENV === 'development') {
    const { worker } = require('./mocks/browser');
    worker.start({ quiet: true });
}

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000,
            retry:false
        },
    },
});
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <RecoilRoot>
                    <App />
                </RecoilRoot>
            </QueryClientProvider>
        </BrowserRouter>
    </React.StrictMode>
);
