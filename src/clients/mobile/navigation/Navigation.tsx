import React, { useCallback, useEffect } from 'react';

import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image, StyleSheet } from 'react-native';

import { useAppContext } from 'common/store/vytc-context/provider';
import { useAppThemeColor } from 'components/theme/useAppThemeColor';
import DownloadNew from 'screens/download/Download';
import Home from 'screens/home/Home';
import Login from 'screens/login/Login';

import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const { auth, clear, signOut } = useAppContext();
  const { themeStyle } = useAppThemeColor();

  // TODO: Remove the following line before publishing (Testing only)
  useEffect(() => {
    clear();
    signOut();
  }, []);

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
          backgroundColor: themeStyle.headerBackgroundColor,
        },
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerLeft: () => LefHeaderLogo(),
      }}
    >
      {!auth.isAuthenticated ? (
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            animationTypeForReplace: !auth.isAuthenticated ? 'pop' : 'push',
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
