import React from 'react';

import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';

import useLogin from 'common/store/hooks/useLogin';
import Logo from 'components/Logo';
import { ThemeButton, ThemeInput, ThemeView } from 'components/ui';

const Login = () => {
  const { login, onPasswordChange } = useLogin();
  const { t } = useTranslation();
  const text = {
    placeholder: 'app.login.placeholder.password',
    button: 'app.login.btn',
  };
  console.log(login);
  return (
    <ThemeView style={[styles.root]}>
      <Logo source={require('../../assets/logo.png')} />

      <ThemeView style={styles.formContainer}>
        <ThemeInput
          input={{
            value: login.value,
            secureTextEntry: true,
            placeholder: t(text.placeholder),

            onChangeText: onPasswordChange,
          }}
        />

        <ThemeButton
          style={styles.formButton}
          text={t(text.button)}
          onPress={() => {
            /** */
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
