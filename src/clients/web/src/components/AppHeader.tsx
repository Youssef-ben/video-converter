import { isMobile } from 'react-device-detect';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Container, Flag, Menu } from 'semantic-ui-react';

import APP_ROUTES from 'navigation/navigation-constants';

import AppLogo from './AppLogo';

const translations = {
  title: 'app.title',
  extras: 'app.title.extras',
};

function AppHeader(): JSX.Element {
  const { t, i18n } = useTranslation();

  // Toggle language.
  const toggleLanguage = () => {
    const value = i18n.language.includes('en') ? 'fr' : 'en';
    i18n.changeLanguage(value);
  };

  return (
    <header>
      <Menu borderless>
        <Container className="app-header" fluid>
          <Link className="home-page-link" to={APP_ROUTES.PRIV_HOME}>
            <Menu.Item>
              <AppLogo forHeader />
            </Menu.Item>

            <Menu.Item header>
              {t(translations.title)} {!isMobile && <div className="extras-title">{t(translations.extras)}</div>}
            </Menu.Item>
          </Link>

          <Menu.Menu position="right">
            <Menu.Item onClick={toggleLanguage}>
              <Flag name={i18n.language === 'en' ? 'ca' : 'us'} />
            </Menu.Item>
          </Menu.Menu>
        </Container>
      </Menu>
    </header>
  );
}

export default AppHeader;
