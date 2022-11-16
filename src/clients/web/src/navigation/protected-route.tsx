import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { useAppContext } from 'common/store/vytc-context/provider';

import APP_ROUTES from './navigation-constants';

/**
 * A wrapper around the {Route} component that redirects the unauthenticated
 * users to the login screen.
 */
function ProtectedRoute(): JSX.Element {
  const { auth } = useAppContext();
  const location = useLocation();

  if (!auth.isAuthenticated) {
    return <Navigate to={APP_ROUTES.PUB_LOGIN} state={{ from: location }} />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
