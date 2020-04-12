import React from "react";
import { IntlContext } from "./Intl_provider_wrapper.jsx";
import { LANGUAGES } from "./language.jsx";

import Nav from "react-bootstrap/Nav"

const LanguageSwitcher = () => (
  <IntlContext.Consumer>
    {({ switchToEnglish, switchToFrench, locale }) => (
      <React.Fragment>
          {locale === LANGUAGES.ENGLISH
             ? <Nav.Link className="text-secondary" onClick={switchToFrench}> {LANGUAGES.FRENCH.toUpperCase()} </Nav.Link>
             : <Nav.Link className="text-secondary" onClick={switchToEnglish}> {LANGUAGES.ENGLISH.toUpperCase()} </Nav.Link>
          }
          
      </React.Fragment>
    )}
  </IntlContext.Consumer>
);

export default LanguageSwitcher;
