import React from 'react';

import { StyleSheet } from 'react-native';

import { AppButton, AppView } from 'components/ui';

const DownloadConversion = () => {
  return (
    <AppView style={[styles.container]}>
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
  );
};

export default DownloadConversion;

const styles = StyleSheet.create({
  container: {
    height: 85,
    justifyContent: 'space-between',
  },
});
