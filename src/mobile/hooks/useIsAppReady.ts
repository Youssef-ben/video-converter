import { useEffect, useState } from 'react';

import { FontAwesome } from '@expo/vector-icons';
import { loadAsync } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import { appFontName } from 'components/theme/AppThemeStyle';

const useIsAppReady = () => {
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    const loadResourcesAndDataAsync = async () => {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await loadAsync({
          ...FontAwesome.font,
          [appFontName]: require('../assets/fonts/Nunito-Medium.ttf'),
        });
      } catch (e) {
        // eslint-disable-next-line no-console
        console.warn(e);
      } finally {
        setIsAppReady(true);
        SplashScreen.hideAsync();
      }
    };

    loadResourcesAndDataAsync();
  }, []);

  return {
    isAppReady,
  };
};

export default useIsAppReady;
