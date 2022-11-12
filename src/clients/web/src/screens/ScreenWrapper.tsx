
import { useEffect } from 'react';

import { Container } from "semantic-ui-react";

import useLogin from 'common/store/hooks/useLogin';
import { useAppContext } from 'common/store/vytc-context/provider';

let timeInterval: NodeJS.Timer;
const TIME_INTERVAL = 5000; // 20 * 60 * 1000; // 20 Minutes after which we should refresh the token.


interface Props {
  children: JSX.Element;
}
function ScreenWrapper({ children }: Props) {
  const { refreshToken } = useLogin();
  const { auth } = useAppContext();

  // Refresh token only when connected
  useEffect(() => {
    // Start only one interval, and only when connected.
    if (timeInterval || !auth.isAuthenticated) {
      return;
    }

    timeInterval = setInterval(async () => {
      refreshToken();
    }, TIME_INTERVAL);
  }, [auth, refreshToken]);


  return (
    <Container className="app-content">
      <div className="yt-content">{children}</div>
    </Container>
  );
}


export default ScreenWrapper;