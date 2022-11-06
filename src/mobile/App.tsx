import React from 'react';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ThemeButton, ThemeInput, ThemeText, ThemeView, useAppThemeColor } from 'components/theme/Index';
import useIsAppReady from 'hooks/useIsAppReady';

export default function App() {
  const { isAppReady } = useIsAppReady();
  const { themeStyle } = useAppThemeColor();

  if (!isAppReady) {
    return null;
  }

  return (
    <SafeAreaProvider style={[themeStyle, styles.container]}>
      <ThemeView style={[styles.simpleView]}>
        <ThemeText>Open up App.tsx to start working on your app!</ThemeText>
      </ThemeView>

      <ThemeView style={[styles.buttonContainer]}>
        <ThemeButton text="Primary" onPress={() => {}} style={styles.marginBottom} />
        <ThemeButton text="Secondary" onPress={() => {}} type="secondary" />
      </ThemeView>

      <ThemeView style={[styles.textContainer]}>
        <ThemeInput
          wrapper={{
            style: styles.marginBottom,
          }}
        />
        <ThemeInput
          label="Input Field"
          input={{
            onChangeText(text) {
              console.log(text);
            },
          }}
        />
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
  textContainer: {
    marginTop: 10,
  },
  marginBottom: {
    marginBottom: 10,
  },
});
