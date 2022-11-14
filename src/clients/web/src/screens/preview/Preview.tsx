/* eslint-disable default-case */
import { useEffect, useState } from 'react';

import ReactPlayer from 'react-player';
import { useNavigate } from 'react-router-dom';
import { Grid, Image, Loader } from 'semantic-ui-react';

import loadingImage from 'assets/images/loading.png';
import { useAppContext } from 'common/store/vytc-context/provider';
import { ScreenAction } from 'common/store/vytc-context/types';
import APP_ROUTES from 'navigation/navigation-constants';

import PreviewConversion from './components/footer/PreviewConversion';
import PreviewDownload from './components/footer/PreviewDownload';
import PreviewProgress from './components/footer/PreviewProgress';
import PreviewHeader from './components/PreviewHeader';

function Preview() {
  const navigate = useNavigate();
  const {
    vyt: { data, preview },
  } = useAppContext();

  const [loadingPlayer, setLoadingPlayer] = useState(true);

  // If no data, return to home
  useEffect(() => {
    if (!data) {
      navigate(APP_ROUTES.PRIV_HOME);
    }
  });

  // Select Screen to display
  let partialScreen = <PreviewConversion />;
  switch (preview.screen) {
    case ScreenAction.PROGRESS:
      partialScreen = <PreviewProgress />;
      break;

    case ScreenAction.DOWNLOAD:
      partialScreen = <PreviewDownload downloadLink="/test" />;
      break;
  }

  return (
    <Grid columns={2} className="preview-convert">
      <Grid.Row className="title">
        <PreviewHeader />
      </Grid.Row>

      <Grid.Row>
        <div className="player-wrapper">
          {loadingPlayer && (
            <div className="react-player loading-image">
              <Loader active inverted size="huge" />

              <Image src={loadingImage} rounded width="100%" height="100%" />
            </div>
          )}

          <ReactPlayer url={data?.link} width="100%" height="100%" className="react-player" controls onReady={() => setLoadingPlayer(false)} />
        </div>
      </Grid.Row>

      {/** TODO: Add The other partial views. */}
      <Grid.Row className="buttons-group">{partialScreen}</Grid.Row>
    </Grid>
  );
}

export default Preview;
