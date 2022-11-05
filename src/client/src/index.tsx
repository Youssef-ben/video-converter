import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './screens/App';
import 'semantic-ui-css/semantic.min.css';
import './styles/Styles.scss';

import 'react-semantic-toasts/styles/react-semantic-alert.css';

// Initialize the translator.
import './app.i18n';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(<App />);
