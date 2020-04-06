import React from "react";
import Navbar from "react-bootstrap/Navbar"
import {FormattedMessage} from "react-intl";

// Custom
import LanguageSwitcher from "../../utils/language_helpers/language_switcher.jsx";
import AppLogo  from "../utils/app_logo.jsx";

export default class Header extends React.PureComponent {
  render() {
    const title = (
      <FormattedMessage
        id={this.props.title}
        defaultMessage={this.props.defaultTitle}
      />
    );

    const navBrand = (
      <>
        <Navbar.Brand>
          <AppLogo
            logo={this.props.logo}
            alt={title}
          />
          <span className="brand-name">
            {title}
          </span>
        </Navbar.Brand>
      </>
    );

    const navToggle = (
      <>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
            <LanguageSwitcher/>
        </Navbar.Collapse>
      </>
    );

    return (
      <header>
        <Navbar bg="light" variant="light">
          {navBrand}

          {navToggle}
        </Navbar>
      </header>
    );
  }
} 
