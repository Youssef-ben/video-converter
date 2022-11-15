import { isMobile } from 'react-device-detect';
import { useTranslation } from 'react-i18next';
import { SemanticToastContainer } from 'react-semantic-toasts';
import { Message } from 'semantic-ui-react';

function AppFooter(): JSX.Element {
  const { t } = useTranslation();

  return (
    <footer>
      <div className="closed-connection app-error hidden">
        <SemanticToastContainer />
        <Message negative className={isMobile ? 'mobile-message' : ''}>
          <p className="app-error-message">{t('ws.err.connection_lost')}</p>
        </Message>
      </div>
    </footer>
  );
}

export default AppFooter;
