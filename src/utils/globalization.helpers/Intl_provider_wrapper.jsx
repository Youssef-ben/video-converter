import React from "react";
import { IntlProvider } from "react-intl";

import {
    LANGUAGES,
    BROWSER_LANGUAGE,
    getLanguagesResources,
} from "./language.jsx"

const Context = React.createContext();

class IntlProviderWrapper extends React.Component {
  constructor(...args) {
    super(...args);

    // Set Switchers
    this.switchToEnglish = () =>{
        this.switchToLanguage(LANGUAGES.ENGLISH);
    }

    this.switchToFrench = () => {
      this.switchToLanguage(LANGUAGES.FRENCH);
    }
    
    // Init State.
    this.state = {
      locale: LANGUAGES.ENGLISH,
      messages: getLanguagesResources(LANGUAGES.ENGLISH),

      switchToEnglish: this.switchToEnglish,
      switchToFrench: this.switchToFrench
    };
  }

  switchToLanguage = (lang) => {
    this.setState({ locale: lang, messages: getLanguagesResources(lang) });
  }

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

export { 
    IntlProviderWrapper, 
    Context as IntlContext,
    BROWSER_LANGUAGE as BrowserLanguage
};
