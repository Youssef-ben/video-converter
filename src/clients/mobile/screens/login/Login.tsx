import React from 'react';

import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';

import useLogin from 'common/store/hooks/useLogin';
import Logo from 'components/Logo';
import { ThemeButton, ThemeInput, ThemeText, ThemeView } from 'components/ui';
import { scale } from 'utils/TextScale';

const Login = () => {
  const { login, connectUser, onPasswordChange } = useLogin();

  const { t } = useTranslation();
  const text = {
    placeholder: 'app.login.placeholder.password',
    button: 'app.login.btn',
  };

  return (
    <ThemeView style={[styles.root]}>
      <Logo source={require('../../assets/logo.png')} />

      <ThemeView style={styles.formContainer}>
        {login.error && (
          <ThemeText style={styles.error} hasError>
            {login.error.content}
          </ThemeText>
        )}
        <ThemeInput
          isInvalid={!!login.error}
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
          onPress={async () => {
            await connectUser();
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
    maxWidth: '90%',
  },
  formButton: {
    marginTop: 15,
  },
  error: {
    fontSize: scale(14),
  },
});
