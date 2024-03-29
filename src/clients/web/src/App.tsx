import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import useLogin from 'common/store/hooks/useLogin';
import { useAppContext } from 'common/store/vytc-context/provider';
import { setupAxiosRequestInterceptor } from 'common/utils/http';
import AppFooter from 'components/AppFooter';
import AppHeader from 'components/AppHeader';
import AppNavigation from 'navigation';
import APP_ROUTES from 'navigation/navigation-constants';

let timeInterval: NodeJS.Timer;
const TIME_INTERVAL = 20 * 60 * 1000; // 20 Minutes after which we should refresh the token.

function App() {
  const navigate = useNavigate();
  const store = useAppContext();
  const { refreshToken } = useLogin();

  // Setup Axios Interceptor for the Request.
  useEffect(() => {
    setupAxiosRequestInterceptor({
      ...store,
      navigation: () => navigate(APP_ROUTES.PUB_LOGIN),
    });
  }, []);

  // Refresh token only when connected
  useEffect(() => {
    // Start only one interval, and only when connected.
    if (timeInterval || !store.auth.isAuthenticated) {
      return;
    }

    timeInterval = setInterval(async () => {
      refreshToken();
    }, TIME_INTERVAL);
  }, [store, refreshToken]);

  return (
    <>
      <AppHeader />

      <section>
        <AppNavigation />
      </section>

      <AppFooter />
    </>
  );
}

export default App;
