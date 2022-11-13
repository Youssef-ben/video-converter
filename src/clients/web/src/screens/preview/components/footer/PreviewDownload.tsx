import { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { Button, Grid } from 'semantic-ui-react';

import IframeDownloader from './iframe_downloader';

const translations = {
  text: 'app.preview.download',
  button: 'app.preview.download.btn',
};

interface PreviewDownloadProps {
  downloadLink: string;
}
function PreviewDownload({ downloadLink }: PreviewDownloadProps) {
  const { t } = useTranslation();
  const [downloadStarted, setDownloadStarted] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setDownloadStarted(true);
    }, 3000); // Time needed for the Iframe to auto start downloading.
  }, []);

  const component = downloadStarted ? (
    <Grid.Column mobile={16} tablet={16} computer={16}>
      <Button color="orange" floated="right" size="small" className="floated-button">
        <span className="break-line">{t(translations.button)}</span>
      </Button>
    </Grid.Column>
  ) : (
    <Grid.Column mobile={16} tablet={16} computer={16}>
      {t('app.preview.download')}
    </Grid.Column>
  );

  return (
    <>
      <IframeDownloader uri={downloadLink} />
      {component}
    </>
  );
}

export default PreviewDownload;
