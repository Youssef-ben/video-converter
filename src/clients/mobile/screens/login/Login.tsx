import React from 'react';

import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';

import useLogin from 'common/store/hooks/useLogin';
import Logo from 'components/Logo';
import { AppButton, AppInput, AppText, AppView } from 'components/ui';
import { scale } from 'utils/TextScale';

const translations = {
  placeholder: 'app.login.placeholder.password',
  button: 'app.login.btn',
};

const Login = () => {
  const { login, connectUser, onPasswordChange } = useLogin();

  const { t } = useTranslation();

  return (
    <AppView style={[styles.root]}>
      <Logo source={require('../../assets/logo.png')} />

      <AppView style={styles.formContainer}>
        {login.error && (
          <AppText style={styles.error} hasError>
            {login.error.content}
          </AppText>
        )}

        <AppInput
          isInvalid={!!login.error}
          input={{
            value: login.value,
            secureTextEntry: true,
            placeholder: t(translations.placeholder),
            onChangeText: onPasswordChange,
          }}
        />

        <AppButton
          loading={login.loading}
          disabled={login.loading}
          style={styles.formButton}
          text={t(translations.button)}
          onPress={async () => {
            await connectUser();
          }}
        />
      </AppView>
    </AppView>
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
