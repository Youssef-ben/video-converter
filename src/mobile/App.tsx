import React from 'react';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useAppThemeColor } from 'components/theme/Index';
import { ThemeButton, ThemeText, ThemeView } from 'components/theme/ThemeComponents';
import useIsAppReady from 'hooks/useIsAppReady';

export default function App() {
  const { isAppReady } = useIsAppReady();
  const { themeStyle, isLightMode } = useAppThemeColor();

  if (!isAppReady) {
    return null;
  }

  return (
    <SafeAreaProvider style={[themeStyle, styles.container]}>
      <ThemeView style={[styles.simpleView]}>
        <ThemeText>Open up App.tsx to start working on your app!</ThemeText>
      </ThemeView>

      <ThemeView style={[styles.buttonContainer]}>
        <ThemeButton text="My Super Long Button Text" onPress={() => {}} />
      </ThemeView>

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
  simpleView: {
    borderWidth: 1,
    margin: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  buttonContainer: {
    margin: 10,
  },
});
