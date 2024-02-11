/* eslint-disable react-native/split-platform-components */

import React, { useCallback } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ToastAndroid } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { VytcContextProvider } from 'common/store/vytc-context/provider';
import { WsProvider } from 'common/store/websocket-context/provider';
import { setTranslation } from 'common/translations';
import { useAppThemeColor } from 'components/theme';
import useResourcesLoader from 'hooks/useResourcesLoader';
import AppNavigation from 'navigation/Navigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import RNLanguageDetector from 'utils/i18next.languageDetector';

// Setup the env variables required by the SERVER_URLS in common constants.
process.env.REACT_APP_SERVER_URL = Constants.expoConfig?.extra?.REACT_APP_SERVER_URL;
process.env.REACT_APP_WS_SERVER_URL = Constants.expoConfig?.extra?.REACT_APP_WS_SERVER_URL;

// Set Translation for the APP.
setTranslation(RNLanguageDetector);

export default function App() {
  const { isAppReady } = useResourcesLoader();
  const { themeStyle } = useAppThemeColor();

  const showToast = useCallback((title: string, message: string, state: 'error' | 'success' | 'warning') => {
    ToastAndroid.show(`[${state.toUpperCase}] :: [${title}] - [${message}]`, ToastAndroid.LONG);
  }, []);

  if (!isAppReady) {
    return null;
  }

  return (
    <SafeAreaProvider style={[themeStyle, styles.container]}>      
      <GestureHandlerRootView style={{ flex: 1 }}>
        <VytcContextProvider storage={AsyncStorage}>
          <WsProvider toastCallback={showToast}>
            <AppNavigation />
          </WsProvider>
        </VytcContextProvider>

        <StatusBar style="auto" />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
