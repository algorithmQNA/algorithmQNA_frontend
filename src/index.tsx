import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {QueryClient, QueryClientProvider} from "react-query";
import {RecoilRoot} from "recoil";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const queryClient = new QueryClient({
    defaultOptions:{
        queries:{
            staleTime: 5 * 60 * 1000
        }
    }
})
root.render(
  <React.StrictMode>
      <QueryClientProvider client={queryClient}>
         <RecoilRoot>
             <App />
         </RecoilRoot>
      </QueryClientProvider>
  </React.StrictMode>
);

