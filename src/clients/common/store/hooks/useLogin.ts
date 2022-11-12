import { useState } from 'react';

import { useTranslation } from 'react-i18next';

import type { LoginPayload, LoginRequestPayload } from 'common/types/server';
import { SERVER_URLS } from 'common/utils/constants';
import { AxiosPost } from 'common/utils/http';

import type { InputError } from '../../types/clients/InputError';
import { useAppContext } from '../vytc-context/provider';

interface LoginState {
  value: string;
  error?: InputError;
}

export interface Welcome {
  version: string;
  release_date: Date;
  name: string;
  copyright: string;
}

const useLogin = () => {
  const { t } = useTranslation();
  const { connect } = useAppContext();

  const [state, setState] = useState<LoginState>({ value: '' });

  const connectUser = async (): Promise<boolean> => {
    if (!state.value) {
      setState((current) => ({
        ...current,
        error: {
          content: t('app.login.err.password_required'),
          pointing: 'below',
        },
      }));
      return false;
    }

    // TODO: Call Login Api!
    const { error, data } = await AxiosPost<LoginRequestPayload, LoginPayload>(SERVER_URLS.security_login, {
      passphrase: state.value,
    });

    if (error) {
      setState({
        value: '',
        error: {
          content: t(error.type),
          fromServer: true,
        },
      });
      return false;
    }
    if (!data) {
      setState({
        value: '',
        error: {
          content: `${t('app.err.unhandled')} - ${t('app.err.unhandled_desc')}`,
          fromServer: true,
        },
      });
      return false;
    }

    // Set Access Token and connect
    connect(data?.accessToken);
    setState({ value: '' });
    return true;
  };

  const onPasswordChange = (value: string) => {
    setState((current) => ({
      ...current,
      value,
    }));
  };

  return { login: state, connectUser, onPasswordChange };
};

export default useLogin;
