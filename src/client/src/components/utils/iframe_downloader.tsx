import * as React from 'react';
import { SERVER_URLS } from '../../utils/constants';

type DownloadIframeProps = {
  uri: string;
};

/**
 * Use this component to download the file from server using the src.
 */
function IframeDownloader(props: DownloadIframeProps): JSX.Element {
  const { uri } = props;
  if (!uri) {
    return <> </>;
  }

  const downloadLink = `${SERVER_URLS.base}${encodeURI(uri)}`;

  return (
    <div style={{ display: 'none' }}>
      <iframe title="iframe-downloader" src={`${downloadLink}`} />
    </div>
  );
}

export default IframeDownloader;
