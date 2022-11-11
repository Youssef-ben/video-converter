import React from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import VytcProvider from 'common/store/contexts/vytc/provider';
import { setTranslation } from 'common/translations';
import { useAppThemeColor } from 'components/theme/Index';
import useResourcesLoader from 'hooks/useResourcesLoader';
import AppNavigation from 'navigation/Navigation';
import RNLanguageDetector from 'utils/i18next.languageDetector';

// Set Translation for the APP.
setTranslation(RNLanguageDetector);

export default function App() {
  const { isAppReady } = useResourcesLoader();
  const { themeStyle } = useAppThemeColor();

  if (!isAppReady) {
    return null;
  }

  return (
    <SafeAreaProvider style={[themeStyle, styles.container]}>
      <VytcProvider storage={AsyncStorage}>
        <AppNavigation />
      </VytcProvider>

      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
