import React from 'react';

import { StackActions } from '@react-navigation/native';
import { StyleSheet } from 'react-native';

import Logo from 'components/Logo';
import { ThemeButton, ThemeInput, ThemeView } from 'components/ui';
import { useAppNavigation } from 'navigation/types';

const Login = () => {
  const navigation = useAppNavigation();

  return (
    <ThemeView style={[styles.root]}>
      <ThemeView style={styles.logoContainer}>
        <Logo source={require('../../assets/logo.png')} dimension={{ width: 180, height: 180 }} />
      </ThemeView>

      <ThemeView style={styles.formContainer}>
        <ThemeInput
          input={{
            placeholder: 'Password...',
          }}
        />
        <ThemeButton
          style={styles.formButton}
          text="Login"
          onPress={() => {
            navigation.dispatch(StackActions.replace('Home'));
          }}
        />
      </ThemeView>
    </ThemeView>
  );
};

export default Login;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: 12,
    alignItems: 'center',
    alignContent: 'center',
  },
  logoContainer: {
    elevation: 10,
    marginTop: '10%',
    borderRadius: 100,
  },

  formContainer: {
    marginTop: '10%',
    marginHorizontal: 10,
  },
  formButton: {
    marginTop: 15,
  },
});
