import React, { useEffect, useState } from 'react';

import { StyleSheet, useWindowDimensions } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

import { useAppContext } from 'common/store/vytc-context/provider';
import { ScreenAction } from 'common/store/vytc-context/types';
import { AppText, AppView } from 'components/ui';
import AppLoader from 'components/ui/AppLoader';
import { useAppNavigation } from 'navigation/types';

import DownloadConversion from './components/DownloadConversion';
import DownloadFinished from './components/DownloadFinished';
import DownloadProgress from './components/DownloadProgress';

const DownloadNew = () => {
  const navigation = useAppNavigation();
  const { width } = useWindowDimensions();
  const { vyt, clear } = useAppContext();

  const [videoLoaded, setVideoLoaded] = useState(false);

  // If no data, return to home
  useEffect(() => {
    if (!vyt?.data) {
      clear();
      navigation.goBack();
    }
  }, [vyt]);

  // Select Screen to display
  let partialScreen: JSX.Element;
  switch (vyt?.download.screen) {
    case ScreenAction.PROGRESS:
      partialScreen = <DownloadProgress />;
      break;

    case ScreenAction.DOWNLOAD:
      partialScreen = <DownloadFinished />;
      break;

    default:
      partialScreen = <DownloadConversion />;
      break;
  }

  return (
    <AppView style={[styles.root]}>
      <AppView style={[styles.titleContainer]}>{videoLoaded && <AppText style={[styles.titleText]}>{vyt.data?.title}</AppText>}</AppView>

      <AppView style={[styles.videoContainer]}>
        {!videoLoaded && <AppLoader />}

        <YoutubePlayer
          height={210}
          width={width - 20}
          videoId={vyt.data?.id}
          webViewProps={{
            renderToHardwareTextureAndroid: true,
          }}
          onReady={() => {
            setVideoLoaded(true);
          }}
        />
      </AppView>

      <AppView style={[styles.footerContainer]}>{videoLoaded && partialScreen}</AppView>
    </AppView>
  );
};

export default DownloadNew;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 10,
    paddingHorizontal: 15,
    justifyContent: 'space-between',
  },

  titleContainer: {
    minHeight: 40,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  titleText: {
    marginVertical: 8,
    fontWeight: 'bold',
    textAlign: 'justify',
  },

  videoContainer: {
    elevation: 5,
    borderRadius: 3,
    overflow: 'hidden',
    alignItems: 'center',
    alignContent: 'center',
  },

  footerContainer: {
    flex: 1,
    marginTop: 10,
  },
});
