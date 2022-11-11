import React from 'react';

// Custom
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from '../routes/routes';

import AppHeader from '../components/header/app_header';
import AppFooter from '../components/footer/app.footer';
import { AppProvider } from '../store/contexts/app_context';
import VytcProvider from '../common/store/contexts/vytc/provider';
import { VytcAsyncStorageProvider } from '../common/store/types';

function App(): JSX.Element {
  const appStorage: VytcAsyncStorageProvider = {
    getItem: async (key: string) => localStorage.getItem(key),
    setItem: async (key: string, value: string) => localStorage.setItem(key, value),
    removeItem: async (key: string) => localStorage.removeItem(key),
  };

  return (
    <>
      <AppHeader />

      <section>
        <BrowserRouter>
          <VytcProvider storage={appStorage}>
            <AppProvider>
              <AppRoutes />
            </AppProvider>
          </VytcProvider>
        </BrowserRouter>
      </section>

      <AppFooter />
    </>
  );
}

export default App;
