import React from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import type { VytcAsyncStorageProvider } from 'common/store/contexts/vytc/provider';
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

  const appStorage: VytcAsyncStorageProvider = {
    getItem: async (key: string) => await AsyncStorage.getItem(key),
    setItem: async (key: string, value: string) => await AsyncStorage.setItem(key, value),
    removeItem: async (key: string) => await AsyncStorage.removeItem(key),
  };

  return (
    <SafeAreaProvider style={[themeStyle, styles.container]}>
      <VytcProvider storage={appStorage}>
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
