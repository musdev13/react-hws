import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { AppProviders } from './app/providers/AppProviders';
import { router } from './app/router';
import './index.css';

async function enableMocking() {
  if (import.meta.env.MODE !== 'development') {
    return;
  }

  const { worker } = await import('./shared/api/mock/browser');
  return worker.start({
    onUnhandledRequest: 'bypass',
    quiet: true
  });
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <AppProviders>
        <RouterProvider router={router} />
      </AppProviders>
    </React.StrictMode>
  );
});