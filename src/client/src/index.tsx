import React from 'react';
import ReactDOM from 'react-dom';
import App from './screens/App';
import 'semantic-ui-css/semantic.min.css';
import './styles/Styles.scss';

import 'react-semantic-toasts/styles/react-semantic-alert.css';

// Initialize the translator.
import './app.i18n';

ReactDOM.render(<App />, document.querySelector('#root'));
