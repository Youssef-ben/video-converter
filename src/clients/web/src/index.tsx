import React from 'react';
import { createRoot } from 'react-dom/client';
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';

import App from './screens/App';
import 'semantic-ui-css/semantic.min.css';
import './styles/Styles.scss';

import 'react-semantic-toasts/styles/react-semantic-alert.css';

// Initialize the translator.
import { setTranslation } from './common/translations';

// Set the Language of the project
setTranslation(new I18nextBrowserLanguageDetector());

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(<App />);
