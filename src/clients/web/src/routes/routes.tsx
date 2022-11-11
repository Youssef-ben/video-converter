import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAppContext } from '../common/store/contexts/vytc/provider';
import PageNotFound from '../components/utils/page_not_found';
import VideoLookup from '../components/youtube_downloader/video_lookup';
import VideoPreview from '../components/youtube_downloader/video_preview';
import YtDownloaderContainer from '../components/youtube_downloader/youtube_downloader_container';
import LoginPage from '../screens/login';
import APP_ROUTES from './routes.constants';
import PrivateRoute from './routes.private_wrapper';

function AppRoutes(): JSX.Element {
  const { auth } = useAppContext();
  console.log(auth);
  const landingPage = auth.data.accessToken ? <Navigate to={APP_ROUTES.PRIV_YTD} /> : <Navigate to={APP_ROUTES.PUB_LOGIN} />;

  const videoLookupComponent = (
    <YtDownloaderContainer>
      <VideoLookup />
    </YtDownloaderContainer>
  );

  const videoPreviewComponent = (
    <YtDownloaderContainer>
      <VideoPreview />
    </YtDownloaderContainer>
  );

  return (
    <Routes>
      {/**
       * Redirect the to the Youtube downloader page at the moment.
       *
       * TODO: Redirect to the landing page if connected.
       */}
      <Route path="/" element={landingPage} />

      <Route path={APP_ROUTES.PUB_LOGIN} element={<LoginPage />} />

      <Route element={<PrivateRoute />}>
        <Route path={APP_ROUTES.PRIV_YTD} element={videoLookupComponent} />
        <Route path={APP_ROUTES.PRIV_YTD_PREVIEW} element={videoPreviewComponent} />
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default AppRoutes;
