import React, { useCallback, useEffect } from 'react';

import { DarkTheme, DefaultTheme, NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image, StyleSheet } from 'react-native';

import useLogin from 'common/store/hooks/useLogin';
import { useAppContext } from 'common/store/vytc-context/provider';
import { setupAxiosRequestInterceptor } from 'common/utils/http';
import { useAppThemeColor } from 'components/theme/useAppThemeColor';
import DownloadNew from 'screens/download/Download';
import Home from 'screens/home/Home';
import Login from 'screens/login/Login';

import type { RootStackParamList } from './types';
import { useAppNavigation } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();
let timeInterval: NodeJS.Timer;
const TIME_INTERVAL = 20 * 60 * 1000; // 20 Minutes after which we should refresh the token.

function RootNavigator() {
  const store = useAppContext();
  const { themeStyle, themeExtras, isDarkMode } = useAppThemeColor();
  const navigation = useAppNavigation();
  const { refreshToken } = useLogin();

  // Setup Axios Interceptor for the Request.
  useEffect(() => {
    setupAxiosRequestInterceptor({
      ...store,
      navigation: () => navigation.dispatch(StackActions.replace('Login')),
    });
  }, []);

  // Refresh token only when connected
  useEffect(() => {
    if (timeInterval || !store.auth.isAuthenticated) {
      return;
    }

    timeInterval = setInterval(async () => {
      refreshToken();
    }, TIME_INTERVAL);
  }, [store, refreshToken]);

  const LefHeaderLogo = useCallback(() => {
    return <Image style={styles.logo} resizeMode="contain" source={require('../assets/logo.png')} />;
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        title: 'VYTC',
        headerBackVisible: true,
        headerTintColor: themeStyle.color,
        headerStyle: {
          backgroundColor: themeExtras.headerBackgroundColor(isDarkMode()),
        },
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerLeft: () => LefHeaderLogo(),
      }}
    >
      {!store.auth.isAuthenticated ? (
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            animationTypeForReplace: !store.auth.isAuthenticated ? 'pop' : 'push',
          }}
        />
      ) : (
        <>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Download" component={DownloadNew} />
        </>
      )}
    </Stack.Navigator>
  );
}

const AppNavigation = () => {
  const { themeStyle, isDarkMode } = useAppThemeColor();
  let theme = isDarkMode() ? DarkTheme : DefaultTheme;

  theme = {
    dark: isDarkMode(),
    colors: {
      ...theme.colors,
      text: themeStyle.color,
      primary: themeStyle.color,
      border: themeStyle.borderColor,
      background: themeStyle.backgroundColor,
    },
  };

  return (
    <NavigationContainer theme={theme}>
      <RootNavigator />
    </NavigationContainer>
  );
};

export default AppNavigation;

const styles = StyleSheet.create({
  logo: {
    width: 42,
    height: 42,
    marginEnd: 15,
    marginStart: -4,
  },
});
