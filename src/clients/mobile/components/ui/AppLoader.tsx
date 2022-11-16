import React from 'react';

import { ActivityIndicator, StyleSheet } from 'react-native';

import { useAppThemeColor } from 'components/theme';

import { AppView } from './AppView';

const AppLoader = () => {
  const { themeStyle } = useAppThemeColor();

  return (
    <AppView style={styles.loading}>
      <ActivityIndicator size="large" color={themeStyle.color} />
    </AppView>
  );
};

export default AppLoader;

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
