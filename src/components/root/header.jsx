import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, NavDropdown } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

// Custom
import LanguageSwitcher from '../../utils/globalization/language_switcher.jsx';
import PreferencesModal from '../preferences/preferences_modal.jsx';
import ImageView from '../utils/image_view.jsx';

export default class Header extends React.PureComponent {
  renderNavBrand = () => {
    const { title, defaultTitle, logo } = this.props;

    const formattedTitle = (
      <FormattedMessage id={title} defaultMessage={defaultTitle} />
    );

    return (
      <Navbar.Brand>
        <ImageView logo={logo} alt={defaultTitle} />
        <span className="brand-name">{formattedTitle}</span>
      </Navbar.Brand>
    );
  };

  renderMenuButton = () => (
    <div style={{ display: 'inline-block' }} className="text-secondary">
      <FontAwesomeIcon icon={faBars} />
    </div>
  );

  renderNavDropDown = () => (
    <>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <NavDropdown title={this.renderMenuButton()} id="dd-preferences">
          <PreferencesModal />
          <NavDropdown.Divider />
          <LanguageSwitcher />
        </NavDropdown>
      </Navbar.Collapse>
    </>
  );

  render() {
    return (
      <header>
        <Navbar bg="light" variant="light">
          {this.renderNavBrand()}

          {this.renderNavDropDown()}
        </Navbar>
      </header>
    );
  }
}

Header.propTypes = {
  title: PropTypes.string,
  defaultTitle: PropTypes.string,
  logo: PropTypes.string,
};
