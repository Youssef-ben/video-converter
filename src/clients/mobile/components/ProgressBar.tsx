import React from 'react';

import { StyleSheet, useWindowDimensions } from 'react-native';
import * as Progress from 'react-native-progress';

import { scale } from 'utils/TextScale';

import { useAppThemeColor } from './theme';
import { AppText, AppView } from './ui';

interface ProgressBarProps {
  text: string;
  progress: number;
}
const ProgressBar = ({ text, progress }: ProgressBarProps) => {
  const { width } = useWindowDimensions();
  const { themeStyle } = useAppThemeColor();

  return (
    <AppView>
      <Progress.Bar
        width={width - 31}
        borderRadius={2}
        progress={progress / 100}
        style={styles.progressBar}
        color={themeStyle.color}
        unfilledColor={themeStyle.backgroundColor}
      />
      <AppView style={styles.progressInfo}>
        <AppText style={styles.progressInfoText}>{text}</AppText>
        <AppText style={styles.progressInfoText}>{progress}%</AppText>
      </AppView>
    </AppView>
  );
};

export default ProgressBar;

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
});
