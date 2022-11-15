import React from 'react';

import { Button, StyleSheet, useWindowDimensions } from 'react-native';
import * as Progress from 'react-native-progress';

import { useAppThemeColor } from 'components/theme';
import { AppText, AppView } from 'components/ui';
import { scale } from 'utils/TextScale';

const DownloadProgress = () => {
  const { width } = useWindowDimensions();
  const { themeStyle } = useAppThemeColor();

  return (
    <AppView>
      <Progress.Bar
        width={width - 31}
        borderRadius={2}
        progress={0.3}
        style={styles.progressBar}
        color={themeStyle.color}
        unfilledColor={themeStyle.backgroundColor}
      />
      <AppView style={styles.progressInfo}>
        <AppText style={styles.progressInfoText}>Downloading...</AppText>
        <AppText style={styles.progressInfoText}>30%</AppText>
      </AppView>

      <AppView style={styles.buttonContainer}>
        <AppView style={styles.cancelButton}>
          <Button
            onPress={() => {
              // TODO - Clean and stop the progress.
            }}
            color={themeStyle.Error}
            title="Cancel"
          />
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
