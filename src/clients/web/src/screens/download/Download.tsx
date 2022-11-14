/* eslint-disable default-case */
import { useEffect, useState } from 'react';

import ReactPlayer from 'react-player';
import { useNavigate } from 'react-router-dom';
import { Grid, Image, Loader } from 'semantic-ui-react';

import loadingImage from 'assets/images/loading.png';
import { useAppContext } from 'common/store/vytc-context/provider';
import { ScreenAction } from 'common/store/vytc-context/types';
import APP_ROUTES from 'navigation/navigation-constants';

import DownloadHeader from './components/DownloadHeader';
import DownloadConversion from './components/footer/DownloadConversion';
import DownloadProgress from './components/footer/DownloadProgress';
import StartDownload from './components/footer/StartDownload';

function Download() {
  const navigate = useNavigate();
  const { vyt } = useAppContext();

  const [loadingPlayer, setLoadingPlayer] = useState(true);

  // If no data, return to home
  useEffect(() => {
    if (!vyt?.data) {
      navigate(APP_ROUTES.PRIV_HOME);
    }
  });

  // Select Screen to display
  let partialScreen: JSX.Element;
  switch (vyt?.download.screen) {
    case ScreenAction.PROGRESS:
      partialScreen = <DownloadProgress />;
      break;

    case ScreenAction.DOWNLOAD:
      partialScreen = <StartDownload downloadLink="/test" />;
      break;

    default:
      partialScreen = <DownloadConversion />;
      break;
  }

  return (
    <Grid columns={2} className="download-convert">
      <Grid.Row className="title">
        <DownloadHeader />
      </Grid.Row>

      <Grid.Row>
        <div className="player-wrapper">
          {loadingPlayer && (
            <div className="react-player loading-image">
              <Loader active inverted size="huge" />

              <Image src={loadingImage} rounded width="100%" height="100%" />
            </div>
          )}

          <ReactPlayer url={vyt?.data?.link} width="100%" height="100%" className="react-player" controls onReady={() => setLoadingPlayer(false)} />
        </div>
      </Grid.Row>

      {/** TODO: Add The other partial views. */}
      <Grid.Row className="buttons-group">{partialScreen}</Grid.Row>
    </Grid>
  );
}

export default Download;
