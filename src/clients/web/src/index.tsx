import React from 'react';

import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';
// eslint-disable-next-line import/order
import { createRoot } from 'react-dom/client';
import 'react-semantic-toasts/styles/react-semantic-alert.css';
import 'semantic-ui-css/semantic.min.css';
import './assets/styles/index.scss';

import { BrowserRouter } from 'react-router-dom';

import App from 'App';
import { VytcContextProvider } from 'common/store/vytc-context/provider';
import type { VytcAsyncStorageProvider } from 'common/store/vytc-context/types';

import { setTranslation } from './common/translations';


// Set the Language of the project
setTranslation(new I18nextBrowserLanguageDetector());

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);


// Make sure that the method are async.
const appStorage: VytcAsyncStorageProvider = {
  getItem: async (key: string) => localStorage.getItem(key),
  setItem: async (key: string, value: string) => localStorage.setItem(key, value),
  removeItem: async (key: string) => localStorage.removeItem(key),
};


root.render(
  <React.StrictMode>
    <VytcContextProvider storage={appStorage} >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </VytcContextProvider>
  </React.StrictMode>
);
