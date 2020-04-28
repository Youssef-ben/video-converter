import React from 'react';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { IntlContext } from './intl_provider_wrapper.jsx';
import { LANGUAGES } from './language.jsx';

const LanguageSwitcher = () => (
  <IntlContext.Consumer>
    {({ switchToLanguage, locale }) => (
      <>
        {locale === LANGUAGES.ENGLISH ? (
          <NavDropdown.Item
            className="text-secondary pt-0 pb-0"
            onClick={() => switchToLanguage(LANGUAGES.FRENCH)}
          >
            Français
          </NavDropdown.Item>
        ) : (
          <NavDropdown.Item
            className="text-secondary pt-0 pb-0"
            onClick={() => switchToLanguage(LANGUAGES.ENGLISH)}
          >
            English
          </NavDropdown.Item>
        )}
      </>
    )}
  </IntlContext.Consumer>
);

export default LanguageSwitcher;
