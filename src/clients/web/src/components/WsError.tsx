/* eslint-disable jsx-a11y/anchor-is-valid */

import { useTranslation } from 'react-i18next';
import { Message } from 'semantic-ui-react';

const translations = {
  errTitle: 'app.err.unhandled_error.title',
  errDesc: 'app.err.unhandled_error.desc',
};

function ErrorView(): JSX.Element {
  const { t } = useTranslation();

  return (
    <Message negative className="ws-error">
      <Message.Header>{t(translations.errTitle)}</Message.Header>
      <p style={{ marginBottom: 0 }}>
        <a role="button" href="#" tabIndex={0} onClick={() => window.location.reload()} onKeyDown={() => window.location.reload()}>
          {t(translations.errDesc)}
        </a>
      </p>
    </Message>
  );
}

export default ErrorView;
