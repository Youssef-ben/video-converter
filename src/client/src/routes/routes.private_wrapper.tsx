import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useAppContext } from '../store/contexts/app_context';
import APP_ROUTES from './routes.constants';

export type PrivateRouteProps = RouteProps;

/**
 * A wrapper around the {Route} component that redirects the unauthenticated
 * users to the login screen.
 *
 * @param props props of the route.
 */
function PrivateRoute({ children, ...props }: PrivateRouteProps): JSX.Element {
  const { state } = useAppContext();

  if (!state.authState.token) {
    return <Redirect to={APP_ROUTES.PUB_LOGIN} />;
  }

  const { path, exact } = props;
  return (
    <Route exact={exact} path={path}>
      {children}
    </Route>
  );
}

export default PrivateRoute;
