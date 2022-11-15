import React from 'react';

import { StyleSheet, useWindowDimensions } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

import { AppButton, AppText, AppView } from 'components/ui';

const Preview = () => {
  const { width } = useWindowDimensions();

  const videoContainerOffset = width < 400 ? 20 : 40;
  return (
    <AppView style={[styles.root]}>
      <AppView hasBorders style={[styles.youtubeContainer]}>
        <YoutubePlayer
          height={210}
          width={width - videoContainerOffset}
          videoId={'2N4SjqaKPA8'}
          webViewProps={{
            renderToHardwareTextureAndroid: true,
          }}
        />
      </AppView>

      <AppView>
        <AppText style={styles.youtubeTitle}>
          Gentle music, calms the nervous system and pleases the soul - healing music for the heart and blood
        </AppText>

        <AppButton
          style={styles.formButton}
          text="DOWNLOAD AS AUDIO"
          onPress={() => {
            /* */
          }}
        />
        <AppButton
          type="secondary"
          style={styles.formButton}
          text="DOWNLOAD AS VIDEO"
          onPress={() => {
            /* */
          }}
        />
      </AppView>
    </AppView>
  );
};

export default Preview;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: 12,
    paddingHorizontal: 5,
    alignItems: 'center',
    alignContent: 'center',
  },

  youtubeContainer: {
    overflow: 'hidden',
    borderRadius: 4,
    alignItems: 'center',
    alignContent: 'center',
  },
  youtubeTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    letterSpacing: 0.25,
    paddingHorizontal: 15,
    marginTop: 8,
  },
  formButton: {
    marginTop: 10,
    marginHorizontal: 15,
  },
});
