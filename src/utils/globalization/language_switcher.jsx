import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { IntlContext } from './intl_provider_wrapper.jsx';
import { LANGUAGES } from './language.jsx';

const LanguageSwitcher = () => (
  <IntlContext.Consumer>
    {({ switchToLanguage, locale }) => (
      <>
        {locale === LANGUAGES.ENGLISH ? (
          <Nav.Link
            className="text-secondary"
            onClick={() => switchToLanguage(LANGUAGES.FRENCH)}
          >
            {' '}
            {LANGUAGES.FRENCH.toUpperCase()}{' '}
          </Nav.Link>
        ) : (
          <Nav.Link
            className="text-secondary"
            onClick={() => switchToLanguage(LANGUAGES.ENGLISH)}
          >
            {' '}
            {LANGUAGES.ENGLISH.toUpperCase()}{' '}
          </Nav.Link>
        )}
      </>
    )}
  </IntlContext.Consumer>
);

export default LanguageSwitcher;
