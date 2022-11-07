import React from 'react';

import { StyleSheet, useWindowDimensions } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

import { ThemeButton, ThemeText, ThemeView } from 'components/ui';

const Preview = () => {
  const { width } = useWindowDimensions();

  return (
    <ThemeView style={[styles.root]}>
      <ThemeView style={[styles.youtubeContainer]}>
        <YoutubePlayer
          height={210}
          width={width - 40}
          videoId={'-DD8PcdE_d0'}
          webViewProps={{
            renderToHardwareTextureAndroid: true,
          }}
        />
      </ThemeView>

      <ThemeView>
        <ThemeText style={styles.youtubeTitle}>
          Gentle music, calms the nervous system and pleases the soul - healing music for the heart and blood
        </ThemeText>

        <ThemeButton style={styles.formButton} text="CONVERT TO AUDIO" onPress={() => {}} />
        <ThemeButton type="secondary" style={styles.formButton} text="CONVERT TO VIDEO" onPress={() => {}} />
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
    color: 'white',
    marginTop: 10,
    marginHorizontal: 15,
  },
});
