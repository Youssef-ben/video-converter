import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { Button, Form, Grid } from 'semantic-ui-react';
import APP_ROUTES from '../../routes/routes.constants';
import IframeDownloader from '../utils/iframe_downloader';

type DownloadLinkProps = {
  link: string;
};

function DownloadLink({ link }: DownloadLinkProps): JSX.Element {
  const { t } = useTranslation();
  const [showText, setShowText] = useState(true);
  const history = useHistory();

  const onFinishHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    history.push(APP_ROUTES.PRIV_HOME);
  };

  // Hide the download text
  setTimeout(() => {
    setShowText(false);
  }, 3000);

  return (
    <Form style={{ marginBottom: '1.5em' }}>
      <Form.Field>
        <IframeDownloader uri={link} />
        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column mobile={16} tablet={10} computer={11}>
              {showText && t('app.auto_download')}
            </Grid.Column>
            <Grid.Column mobile={16} tablet={6} computer={5}>
              {!showText && (
                <Button className="btn yt-right" color="red" onClick={onFinishHandler}>
                  <span>{t('btn.finish')}</span>
                </Button>
              )}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form.Field>
    </Form>
  );
}

export default DownloadLink;
