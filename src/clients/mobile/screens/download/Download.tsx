import React, { useState } from 'react';

import { ActivityIndicator, StyleSheet, useWindowDimensions } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

import { useAppThemeColor } from 'components/theme/Index';
import { AppButton, AppText, AppView } from 'components/ui';

const DownloadNew = () => {
  const { width } = useWindowDimensions();
  const { themeStyle } = useAppThemeColor();

  const [videoLoaded, setVideoLoaded] = useState(false);

  const text = 'Adagios - The Most Relaxing Classical Music';
  return (
    <AppView style={[styles.root]}>
      <AppView style={[styles.titleContainer]}>{videoLoaded && <AppText style={[styles.titleText]}>{text}</AppText>}</AppView>

      <AppView style={[styles.videoContainer]}>
        {!videoLoaded && (
          <AppView style={styles.loading}>
            <ActivityIndicator size="large" color={themeStyle.color} />
          </AppView>
        )}

        <YoutubePlayer
          height={210}
          width={width - 20}
          videoId={'2N4SjqaKPA8'}
          webViewProps={{
            renderToHardwareTextureAndroid: true,
          }}
          onReady={() => {
            setVideoLoaded(true);
          }}
        />
      </AppView>

      <AppView style={[styles.footerContainer]}>
        {videoLoaded && (
          <AppView style={[styles.buttons]}>
            <AppButton
              text="DOWNLOAD AS AUDIO"
              onPress={() => {
                /* */
              }}
            />
            <AppButton
              type="secondary"
              text="DOWNLOAD AS VIDEO"
              onPress={() => {
                /* */
              }}
            />
          </AppView>
        )}
      </AppView>
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
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
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
  buttons: {
    justifyContent: 'space-between',
    height: 85,
  },
});
