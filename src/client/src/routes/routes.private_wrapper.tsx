import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAppContext } from '../store/contexts/app_context';
import APP_ROUTES from './routes.constants';

/**
 * A wrapper around the {Route} component that redirects the unauthenticated
 * users to the login screen.
 *
 * @param props props of the route.
 */
function PrivateRoute(): JSX.Element {
  const { state } = useAppContext();

  if (!state.authState.token) {
    return <Navigate to={APP_ROUTES.PUB_LOGIN} />;
  }

  return <Outlet />;
}

export default PrivateRoute;
