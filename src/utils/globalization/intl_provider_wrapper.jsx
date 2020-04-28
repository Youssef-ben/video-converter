import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider } from 'react-intl';

import {
  LANGUAGES,
  BROWSER_LANGUAGE,
  getLanguagesResources,
} from './language.jsx';

const Context = React.createContext();

class IntlProviderWrapper extends React.Component {
  constructor(...args) {
    super(...args);

    // Init State.
    this.state = {
      locale: LANGUAGES.ENGLISH,
      messages: getLanguagesResources(LANGUAGES.ENGLISH),

      // Will be used in the Switcher class.
      switchToLanguage: this.switchToLanguage, // eslint-disable-line react/no-unused-state
    };
  }

  switchToLanguage = (lang) => {
    this.setState({ locale: lang, messages: getLanguagesResources(lang) });
  };

  render() {
    const { children } = this.props;
    const { locale, messages } = this.state;

    return (
      <Context.Provider value={this.state}>
        <IntlProvider
          key={locale}
          locale={locale}
          messages={messages}
          defaultLocale={LANGUAGES.ENGLISH}
        >
          {children}
        </IntlProvider>
      </Context.Provider>
    );
  }
}

IntlProviderWrapper.propTypes = {
  children: PropTypes.node,
};
export {
  IntlProviderWrapper,
  Context as IntlContext,
  BROWSER_LANGUAGE as BrowserLanguage,
};
