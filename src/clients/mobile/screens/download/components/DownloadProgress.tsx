import React from 'react';

import { useTranslation } from 'react-i18next';
import { Button, StyleSheet } from 'react-native';

import { useProgress } from 'common/store/hooks/useProgress';
import { useAppContext } from 'common/store/vytc-context/provider';
import { ScreenAction } from 'common/store/vytc-context/types';
import ProgressBar from 'components/ProgressBar';
import { useAppThemeColor } from 'components/theme';
import { AppView } from 'components/ui';

const DownloadProgress = () => {
  const { t } = useTranslation();
  const { themeExtras } = useAppThemeColor();
  const { setScreen } = useAppContext();
  const { progress, onCancel } = useProgress();

  const onCancelHandler = () => {
    onCancel();
    setScreen(ScreenAction.PREVIEW);
  };

  return (
    <AppView>
      <ProgressBar text={t(progress.text)} progress={progress.progress} />

      <AppView style={styles.buttonContainer}>
        <AppView style={styles.cancelButton}>
          <Button onPress={onCancelHandler} color={themeExtras.error} title={t('app.download.progress.btn')} />
        </AppView>
      </AppView>
    </AppView>
  );
};

export default DownloadProgress;

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 10,
    justifyContent: 'flex-end',
  },
  cancelButton: {
    width: '50%',
    borderRadius: 3,
    overflow: 'hidden',
    alignSelf: 'flex-end',
  },
});
