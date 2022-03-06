import React from 'react';
import { isMobile } from 'react-device-detect';
import { useTranslation } from 'react-i18next';
import { Container, Flag, Menu, Image } from 'semantic-ui-react';

import Logo from '../../assets/images/logo.png';

function AppHeader(): JSX.Element {
  const { t, i18n } = useTranslation();

  // Toggle language.
  const toggleLanguage = () => {
    let value = 'en-US';
    if (i18n.language.includes('en')) {
      value = 'fr-FR';
    } else {
      value = 'en-US';
    }

    i18n.changeLanguage(value);
  };

  return (
    <header>
      <Menu borderless>
        <Container className="app-header" fluid>
          <a className="home-page-link" href="/">
            <Menu.Item>
              <Image className="app-logo" size="mini" rounded src={Logo} inline />
            </Menu.Item>

            <Menu.Item header>
              {t('app.title')} {!isMobile && <div className="extras-title">{t('app.title.extras')}</div>}
            </Menu.Item>
          </a>
          <Menu.Menu position="right">
            <Menu.Item onClick={toggleLanguage}>
              <Flag name={i18n.language.includes('en') ? 'ca' : 'us'} />
            </Menu.Item>
          </Menu.Menu>
        </Container>
      </Menu>
    </header>
  );
}

export default AppHeader;
