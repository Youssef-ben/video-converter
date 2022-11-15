import React from 'react';

import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';

import { useAppContext } from 'common/store/vytc-context/provider';
import { FileType, ScreenAction } from 'common/store/vytc-context/types';
import { AppButton, AppView } from 'components/ui';

const translations = {
  btnDownload: 'app.download.convert',
  btnMp3: 'app.download.convert.audio',
  btnMp4: 'app.download.convert.video',
};

const DownloadConversion = () => {
  const { t } = useTranslation();
  const { setScreen, setFileType } = useAppContext();

  const onClick = (filetype: FileType) => {
    setFileType(filetype);
    setScreen(ScreenAction.PROGRESS);
  };

  return (
    <AppView style={[styles.container]}>
      <AppButton
        text={`${t(translations.btnDownload)} ${t(translations.btnMp3)}`}
        onPress={() => {
          onClick(FileType.AUDIO_ONLY);
        }}
      />
      <AppButton
        type="secondary"
        text={`${t(translations.btnDownload)} ${t(translations.btnMp4)}`}
        onPress={() => {
          onClick(FileType.VIDEO);
        }}
      />
    </AppView>
  );
};

export default DownloadConversion;

const styles = StyleSheet.create({
  container: {
    height: 85,
    justifyContent: 'space-between',
  },
});
