import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { Provider } from 'react-redux';
import { routeTree } from './routeTree.gen';
import './index.css';
import { store } from './stores/store';
import { useAuthInit } from './hooks/auths/useAuthInit';
import { useBroadcastAuth } from './hooks/auths/useBroadcastAuth';

const router = createRouter({ routeTree });

// Component wrapper để gọi hooks
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useAuthInit();
  useBroadcastAuth();
  return <>{children}</>;
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);
