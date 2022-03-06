import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PageNotFound from '../components/utils/page_not_found';
import VideoLookup from '../components/youtube_downloader/video_lookup';
import VideoPreview from '../components/youtube_downloader/video_preview';
import LoginPage from '../screens/login';
import PrivateRoute from './routes.private_wrapper';
import APP_ROUTES from './routes.constants';
import YtDownloaderContainer from '../components/youtube_downloader/youtube_downloader_container';

function AppRoutes(): JSX.Element {
  return (
    <Switch>
      {/**
       * Redirect the to the Youtube downloader page at the moment.
       *
       * TODO: Redirect to the landing page if connected.
       */}
      <Route exact path={APP_ROUTES.PRIV_HOME}>
        <Redirect to={APP_ROUTES.PRIV_YTD} />
      </Route>

      <Route exact path={APP_ROUTES.PUB_LOGIN} component={LoginPage} />

      <PrivateRoute exact path={APP_ROUTES.PRIV_YTD}>
        <YtDownloaderContainer>
          <VideoLookup />
        </YtDownloaderContainer>
      </PrivateRoute>

      <PrivateRoute exact path={APP_ROUTES.PRIV_YTD_PREVIEW}>
        <YtDownloaderContainer>
          <VideoPreview />
        </YtDownloaderContainer>
      </PrivateRoute>

      <Route component={PageNotFound} />
    </Switch>
  );
}

export default AppRoutes;
