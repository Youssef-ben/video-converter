import React from 'react';

import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAppThemeColor } from 'components/theme/useAppThemeColor';
import Home from 'screens/Home';
import Login from 'screens/login/Login';

import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const { themeStyle } = useAppThemeColor();

  return (
    <Stack.Navigator
      screenOptions={{
        headerBackVisible: true,
        headerTintColor: themeStyle.color,
        headerStyle: {
          backgroundColor: themeStyle.headerBackgroundColor,
        },
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Home" component={Home} />
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
