import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Form, Grid } from 'semantic-ui-react';
import IframeDownloader from '../utils/iframe_downloader';

type DownloadLinkProps = {
  link: string;
};

function DownloadLink({ link }: DownloadLinkProps): JSX.Element {
  const { t } = useTranslation();
  const [showText, setShowText] = useState(true);

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
                <Button className="btn yt-right" color="red" onClick={() => window.location.reload()}>
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
