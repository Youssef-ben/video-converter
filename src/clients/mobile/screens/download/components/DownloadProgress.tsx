import React from 'react';

import { useTranslation } from 'react-i18next';
import { Button, StyleSheet, useWindowDimensions } from 'react-native';
import * as Progress from 'react-native-progress';

import { useProgress } from 'common/store/hooks/useProgress';
import { useAppContext } from 'common/store/vytc-context/provider';
import { ScreenAction } from 'common/store/vytc-context/types';
import { useAppThemeColor } from 'components/theme';
import { AppText, AppView } from 'components/ui';
import { scale } from 'utils/TextScale';

const DownloadProgress = () => {
  const { t } = useTranslation();
  const { width } = useWindowDimensions();
  const { themeStyle } = useAppThemeColor();
  const { setScreen } = useAppContext();
  const { progress, onCancel } = useProgress();

  const onCancelHandler = () => {
    onCancel();
    setScreen(ScreenAction.PREVIEW);
  };

  return (
    <AppView>
      <Progress.Bar
        width={width - 31}
        borderRadius={2}
        progress={progress.progress / 100}
        style={styles.progressBar}
        color={themeStyle.color}
        unfilledColor={themeStyle.backgroundColor}
      />
      <AppView style={styles.progressInfo}>
        <AppText style={styles.progressInfoText}>{t(progress.text)}</AppText>
        <AppText style={styles.progressInfoText}>{progress.progress}%</AppText>
      </AppView>

      <AppView style={styles.buttonContainer}>
        <AppView style={styles.cancelButton}>
          <Button onPress={onCancelHandler} color={themeStyle.Error} title={t('app.download.progress.btn')} />
        </AppView>
      </AppView>
    </AppView>
  );
};

export default DownloadProgress;

const styles = StyleSheet.create({
  progressBar: {
    elevation: 5,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressInfoText: {
    fontSize: scale(10),
  },
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
