import React from 'react';
import { Container } from 'semantic-ui-react';
import WsProvider from '../../store/contexts/websocket_client';
import { refreshAccessToken } from '../../utils/helpers';

type ContainerProps = {
  children: JSX.Element;
};
function YtDownloaderContainer({ children }: ContainerProps): JSX.Element {
  React.useEffect(() => {
    refreshAccessToken();
  }, []);

  return (
    <WsProvider>
      <Container className="app-content">
        <div className="yt-content">{children}</div>
      </Container>
    </WsProvider>
  );
}

export default YtDownloaderContainer;
