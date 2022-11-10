import React from 'react';

// Custom
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from '../routes/routes';

import AppHeader from '../components/header/app_header';
import AppFooter from '../components/footer/app.footer';
import { AppProvider } from '../store/contexts/app_context';

function App(): JSX.Element {
  return (
    <>
      <AppHeader />

      <section>
        <BrowserRouter>
          <AppProvider>
            <AppRoutes />
          </AppProvider>
        </BrowserRouter>
      </section>

      <AppFooter />
    </>
  );
}

export default App;
