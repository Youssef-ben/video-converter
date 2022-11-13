import { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";
import ReactPlayer from "react-player";
import { useNavigate } from "react-router-dom";
import { Dropdown, Grid, Image, Label, Loader, Popup } from "semantic-ui-react";

import loadingImage from 'assets/images/loading.png';
import { useAppContext } from "common/store/vytc-context/provider";
import APP_ROUTES from "navigation/navigation-constants";

import PartialPreviewConvert from "./PartialPreviewConvert";

const translations = {
  videoTitle: 'app.preview.video.title',
  dropdownLabel: 'app.preview.video_quality',
  downloadQualityLabel: 'app.preview.video_quality.label',
};

function Preview() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { vyt } = useAppContext();

  // If no data, return to home
  useEffect(() => {
    if (!vyt) {
      navigate(APP_ROUTES.PRIV_HOME);
    }
  })

  const [loadingPlayer, setLoadingPlayer] = useState(true);

  return (
    <Grid columns={2} className="preview-convert">
      <Grid.Row className="title">
        <Grid.Column className="right-padding-none" mobile={16} tablet={10} computer={12}>
          <Popup

            header={t(translations.videoTitle)}
            content={vyt?.title}
            className="popup-note"
            trigger={
              <Label className="video-title">
                {vyt?.title}
              </Label>
            }
          />
        </Grid.Column>

        <Grid.Column className="left-padding-none" mobile={16} tablet={6} computer={4}>
          <Popup
            className="popup-note"
            header="Note"
            content={t(translations.downloadQualityLabel)}
            trigger={
              <Dropdown
                fluid
                button
                className="icon video-quality"
                labeled
                icon="setting"
                text={t(translations.dropdownLabel)}
              />
            }
          />
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>

        <div className="player-wrapper">
          {loadingPlayer && (
            <div className="react-player loading-image" >
              <Loader active inverted size="huge" />

              <Image src={loadingImage} rounded width="100%" height="100%" />
            </div>
          )}


          <ReactPlayer url={vyt?.link} width="100%" height="100%" className="react-player" controls onReady={() => setLoadingPlayer(false)} />
        </div>

      </Grid.Row>

      <Grid.Row className="buttons-group">
        {/** TODO: Add The other partial views. */}
        <PartialPreviewConvert />
      </Grid.Row>
    </Grid>
  )
}


export default Preview;