import React from 'react';

import { StackActions } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';

import { useAppContext } from 'common/store/contexts/vytc/provider';
import Logo from 'components/Logo';
import { ThemeButton, ThemeInput, ThemeView } from 'components/ui';
import { useAppNavigation } from 'navigation/types';

const Login = () => {
  const navigation = useAppNavigation();
  const { t } = useTranslation();
  const { auth } = useAppContext();

  return (
    <ThemeView style={[styles.root]}>
      <Logo source={require('../../assets/logo.png')} />

      <ThemeView style={styles.formContainer}>
        <ThemeInput
          input={{
            placeholder: t('app.login.password'),
          }}
        />

        <ThemeButton
          style={styles.formButton}
          text={t('app.login.btn')}
          onPress={() => {
            auth.connect('YoDude');
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

  formContainer: {
    marginTop: '10%',
    marginHorizontal: 10,
  },
  formButton: {
    marginTop: 15,
  },
});
