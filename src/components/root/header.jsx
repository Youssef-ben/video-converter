import React from 'react';
import PropTypes from 'prop-types';
import Navbar from 'react-bootstrap/Navbar';
import { FormattedMessage } from 'react-intl';

// Custom
import LanguageSwitcher from '../../utils/globalization/language_switcher.jsx';
import ImageView from '../utils/image_view.jsx';

export default class Header extends React.PureComponent {
  render() {
    const { title, defaultTitle, logo } = this.props;

    const formattedTitle = (
      <FormattedMessage id={title} defaultMessage={defaultTitle} />
    );

    const navBrand = (
      <>
        <Navbar.Brand>
          <ImageView logo={logo} alt={defaultTitle} />
          <span className="brand-name">{formattedTitle}</span>
        </Navbar.Brand>
      </>
    );

    const navToggle = (
      <>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <LanguageSwitcher />
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

Header.propTypes = {
  title: PropTypes.string,
  defaultTitle: PropTypes.string,
  logo: PropTypes.string,
};
