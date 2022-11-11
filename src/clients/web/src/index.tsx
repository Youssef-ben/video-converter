import React from 'react';

import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';
import { createRoot } from 'react-dom/client';

import 'react-semantic-toasts/styles/react-semantic-alert.css';
import 'semantic-ui-css/semantic.min.css';
import './assets/styles/index.scss';

import App from './App';
import { setTranslation } from './common/translations';

// Set the Language of the project
setTranslation(new I18nextBrowserLanguageDetector());

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
