import React from 'react';

import { StyleSheet, useWindowDimensions } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

import { ThemeButton, ThemeText, ThemeView } from 'components/ui';

const Preview = () => {
  const { width } = useWindowDimensions();

  const videoContainerOffset = width < 400 ? 20 : 40;
  return (
    <ThemeView style={[styles.root]}>
      <ThemeView hasBorders style={[styles.youtubeContainer]}>
        <YoutubePlayer
          height={210}
          width={width - videoContainerOffset}
          videoId={'2N4SjqaKPA8'}
          webViewProps={{
            renderToHardwareTextureAndroid: true,
          }}
        />
      </ThemeView>

      <ThemeView>
        <ThemeText style={styles.youtubeTitle}>
          Gentle music, calms the nervous system and pleases the soul - healing music for the heart and blood
        </ThemeText>

        <ThemeButton style={styles.formButton} text="DOWNLOAD AS AUDIO" onPress={() => {}} />
        <ThemeButton type="secondary" style={styles.formButton} text="DOWNLOAD AS VIDEO" onPress={() => {}} />
      </ThemeView>
    </ThemeView>
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
