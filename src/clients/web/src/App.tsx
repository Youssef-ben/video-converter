import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { useAppContext } from "common/store/vytc-context/provider";
import { setupAxiosRequestInterceptor } from "common/utils/http";
import AppFooter from "components/AppFooter";
import AppHeader from "components/AppHeader";
import AppNavigation from "navigation";
import APP_ROUTES from "navigation/navigation-constants";

function App() {
  const store = useAppContext();
  const navigate = useNavigate();

  // Setup Axios Interceptor for the Request.
  useEffect(() => {
    setupAxiosRequestInterceptor({
      ...store,
      navigation: () => navigate(APP_ROUTES.PUB_LOGIN),
    });
  }, [store, navigate])

  return (
    <>
      <AppHeader />

      <section>
        <AppNavigation />
      </section>

      <AppFooter />
    </>
  )
}


export default App;