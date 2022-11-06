import React from 'react';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useAppThemeColor } from 'components/theme/Index';
import useResourcesLoader from 'hooks/useResourcesLoader';
import AppNavigation from 'navigation/Navigation';

export default function App() {
  const { isAppReady } = useResourcesLoader();
  const { themeStyle } = useAppThemeColor();

  if (!isAppReady) {
    return null;
  }

  return (
    <SafeAreaProvider style={[themeStyle, styles.container]}>
      <AppNavigation />

      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
