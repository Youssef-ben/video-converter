import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';

import ProgressBar from 'components/ProgressBar';
import { AppView } from 'components/ui';

import { useDownloadFinished } from '../hooks/useDownloadFinished';

const DownloadFinished = () => {
  const { t } = useTranslation();
  const { progress, downloadAsync } = useDownloadFinished();

  // Only need to auto start the download process.
  useEffect(() => {
    downloadAsync();
  }, []);

  return (
    <AppView>
      <ProgressBar text={t('app.download.download.started')} progress={progress} />
    </AppView>
  );
};

export default DownloadFinished;
