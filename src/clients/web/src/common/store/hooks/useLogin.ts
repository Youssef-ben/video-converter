import { useState } from 'react';

import { useTranslation } from 'react-i18next';

import type { InputError } from '../../types/clients/InputError';

interface LoginState {
  value: string;
  error?: InputError;
}

const useLogin = () => {
  const { t } = useTranslation();
  const [state, setState] = useState<LoginState>({ value: '' });

  const onLogin = async () => {
    if (!state.value) {
      setState((current) => ({
        ...current,
        error: {
          content: t('app.login.err.password_required'),
          pointing: 'below',
        },
      }));
      return;
    }

    setState({ value: '' });
  };

  const onPasswordChange = (value: string) => {
    setState((current) => ({
      ...current,
      value,
    }));
  };

  return { login: state, onLogin, onPasswordChange };
};

export default useLogin;
