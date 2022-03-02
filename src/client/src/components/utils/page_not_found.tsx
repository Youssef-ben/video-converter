import React from 'react';

import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import PageNotFound404Logo from '../../assets/img/404/404.svg';
import MeteorLogo from '../../assets/img/404/meteor.svg';
import AstronautLogo from '../../assets/img/404/astronaut.svg';
import SpaceshipLogo from '../../assets/img/404/spaceship.svg';

function PageNotFound(): JSX.Element {
  const { t } = useTranslation();

  return (
    <div className="page-not-found">
      <img alt="astronaut" src={AstronautLogo} className="astronaut" />
      <img alt="404" src={PageNotFound404Logo} className="logo-404" />
      <img alt="meteor" src={MeteorLogo} className="meteor" />

      <p className="title">{t('app.page.not_found.title')}</p>

      <p className="subtitle">
        {t('app.page.not_found.subtitle')}
        <br />
        {t('app.page.not_found.subtitle_2')}
      </p>

      <div className="go-back-wrapper">
        <Link className="btn-back" to="/">
          {t('app.page.not_found.back_btn')}
        </Link>
      </div>

      <div className="mars" />
      <img alt="spaceship" src={SpaceshipLogo} className="spaceship" />
    </div>
  );
}

export default PageNotFound;
