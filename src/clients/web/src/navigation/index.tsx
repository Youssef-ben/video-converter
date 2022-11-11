import { Navigate, Route, Routes } from "react-router-dom";

import Home from "screens/home";
import Login from "screens/login";
import PageNotFound from "screens/page-not-found";

import APP_ROUTES from "./navigation-constants";
import ProtectedRoute from "./protected-route";

function AppNavigation() {

  return (
    <Routes>
      {/* Always redirect to Home page. */}
      <Route path="/" element={<Navigate to={APP_ROUTES.PRIV_HOME} />} />

      <Route path={APP_ROUTES.PUB_LOGIN} element={<Login />} />

      {/* Protected pages only */}
      <Route element={<ProtectedRoute />} >
        <Route path={APP_ROUTES.PRIV_HOME} element={<Home />} />
      </Route>

      {/* Any URL that is not registered, return not found page. */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  )
}


export default AppNavigation;
