import type { ColorSchemeName } from 'react-native';
import { useColorScheme as _useColorScheme } from 'react-native';

import { AppThemeStyle } from './AppThemeStyle';

/**
 * Returns the app theme colors.
 */
export const useAppThemeColor = () => {
  const appTheme = _useColorScheme() as NonNullable<ColorSchemeName>;

  return {
    mode: appTheme,
    themeStyle: AppThemeStyle[appTheme],

    isDarkMode: () => appTheme === 'dark',
    isLightMode: () => appTheme === 'light',
  };
};
