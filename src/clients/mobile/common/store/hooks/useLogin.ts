import { useState } from 'react';

import { useTranslation } from 'react-i18next';

import type { LoginPayload, LoginRequestPayload } from 'common/types/server';
import { SERVER_URLS } from 'common/utils/constants';
import { axiosGet, axiosPost } from 'common/utils/http';

import type { InputError } from '../../types/clients/InputError';
import { useAppContext } from '../vytc-context/provider';

interface LoginState {
  value: string;
  loading: boolean;
  error?: InputError;
}
const INITIAL_VALUES: LoginState = { value: '#Vytc22', loading: false };

const useLogin = () => {
  const { t } = useTranslation();
  const { connect, refresh } = useAppContext();

  const [state, setState] = useState<LoginState>(INITIAL_VALUES);

  const onPasswordChange = (value: string) => {
    setState((current) => ({
      ...current,
      value,
    }));
  };

  const connectUser = async (): Promise<boolean> => {
    setState((current) => ({ ...current, loading: true }));

    // Validate the password is not empty.
    if (!state.value) {
      setState((current) => ({
        ...current,
        loading: false,
        error: {
          content: t('app.login.err.password_required'),
          pointing: 'below',
        },
      }));
      return false;
    }

    // Call the Login API.
    const { error, data } = await axiosPost<LoginRequestPayload, LoginPayload>(SERVER_URLS.securityLogin, {
      passphrase: state.value,
    });

    // Check for errors
    if (error || !data) {
      const errorContent = !data && !error ? t('app.err.unhandled_error.desc') : t(error?.type as string);

      setState({
        value: '',
        loading: false,
        error: {
          content: errorContent,
          fromServer: true,
        },
      });
      return false;
    }

    // Connect and reset values.
    connect(data?.accessToken);
    setState(INITIAL_VALUES);
    return true;
  };

  const refreshToken = async () => {
    // Call the Login API.
    const { data } = await axiosGet<LoginPayload>(SERVER_URLS.securityRefresh);
    if (data) {
      refresh(data.accessToken);
    }
  };

  return { login: state, connectUser, refreshToken, onPasswordChange };
};

export default useLogin;
