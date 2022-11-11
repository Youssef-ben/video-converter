/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { isMobile } from 'react-device-detect';
import { useTranslation } from 'react-i18next';
import { Message } from 'semantic-ui-react';

function ErrorView(): JSX.Element {
  const { t } = useTranslation();

  return (
    <Message negative className={isMobile ? 'mobile-message' : ''}>
      <Message.Header>{t('app.err.unhandled')}</Message.Header>
      <p style={{ marginBottom: 0 }}>
        {t('app.err.unhandled_desc')}{' '}
        <a role="button" href="#" tabIndex={0} onClick={() => window.location.reload()} onKeyDown={() => window.location.reload()}>
          {t('app.err.unhandled_reload')}
        </a>{' '}
        {t('app.err.unhandled_contact_team')}
      </p>
    </Message>
  );
}

export default ErrorView;
