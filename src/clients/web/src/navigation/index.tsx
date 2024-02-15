import { useAppContext } from 'common/store/vytc-context/provider';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Download from 'screens/download/Download';
import Home from 'screens/home';
import Login from 'screens/login';
import PageNotFound from 'screens/PageNotFound';
import ScreenWrapper from 'screens/ScreenWrapper';

import APP_ROUTES from './navigation-constants';
import ProtectedRoute from './protected-route';

function AppNavigation() {
  const { auth } = useAppContext();
  const { pathname } = useLocation();

  if (auth.isAuthenticated && pathname === APP_ROUTES.PUB_LOGIN) {
    return <Navigate to={APP_ROUTES.PRIV_HOME} />;
  }

  return (
    <Routes>
      {/* Always redirect to Home page. */}
      <Route path="/" element={<Navigate to={APP_ROUTES.PRIV_HOME} />} />

      <Route path={APP_ROUTES.PUB_LOGIN} element={<Login />} />

      {/* Protected pages only */}
      <Route element={<ProtectedRoute />}>
        <Route
          path={APP_ROUTES.PRIV_HOME}
          element={
            <ScreenWrapper>
              <Home />
            </ScreenWrapper>
          }
        />
        <Route
          path={APP_ROUTES.PRIV_PREVIEW}
          element={
            <ScreenWrapper>
              <Download />
            </ScreenWrapper>
          }
        />
      </Route>

      {/* Any URL that is not registered, return not found page. */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default AppNavigation;
