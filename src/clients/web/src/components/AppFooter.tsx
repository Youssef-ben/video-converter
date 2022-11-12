

import { isMobile } from 'react-device-detect';
import { useTranslation } from 'react-i18next';
import { SemanticToastContainer } from 'react-semantic-toasts';
import { Message } from 'semantic-ui-react';


function AppFooter(): JSX.Element {
  const { t } = useTranslation();

  return (
    <footer>
      <div className="closed-connection hidden">
        <Message negative className={isMobile ? 'mobile-message' : ''}>
          <p>{t('ws.err.connection_lost')}</p>
        </Message>
        <SemanticToastContainer />
      </div>
    </footer>
  );
}

export default AppFooter;
