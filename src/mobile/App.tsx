import React from 'react';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useAppThemeColor } from 'components/theme/Index';
import useIsAppReady from 'hooks/useIsAppReady';

export default function App() {
  const { isAppReady } = useIsAppReady();
  const { themeStyle } = useAppThemeColor();

  if (!isAppReady) {
    return null;
  }

  return (
    <SafeAreaProvider style={[themeStyle, styles.container]}>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
