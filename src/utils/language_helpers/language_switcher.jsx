import React from "react";
import { IntlContext } from "./IntlProviderWrapper.jsx";
import { LANGUAGES } from "./language.jsx";

import Nav from "react-bootstrap/Nav"

const LanguageSwitcher = () => (
  <IntlContext.Consumer>
    {({ switchToEnglish, switchToFrench, locale }) => (
      <React.Fragment>
          {locale === LANGUAGES.ENGLISH
             ? <Nav.Link onClick={switchToFrench}> {LANGUAGES.FRENCH.toUpperCase()} </Nav.Link>
             : <Nav.Link onClick={switchToEnglish}> {LANGUAGES.ENGLISH.toUpperCase()} </Nav.Link>
          }
          
      </React.Fragment>
    )}
  </IntlContext.Consumer>
);

export default LanguageSwitcher;
