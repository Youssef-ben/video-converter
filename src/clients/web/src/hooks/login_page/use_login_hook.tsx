/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse } from 'axios';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { InputOnChangeData } from 'semantic-ui-react';
import { useAppContext } from '../../common/store/contexts/vytc/provider';
import ShowToast from '../../components/utils/custom_toast';
import APP_ROUTES from '../../routes/routes.constants';

import ApiResponse from '../../types/api.response';
import { InputError } from '../../types/input_error';
import { LoginDto, LoginResponseDto } from '../../types/vytc/security.models';
import { SERVER_URLS } from '../../utils/constants';
import { handleError } from '../../utils/helpers';

interface UseLoginHook {
  hasAuthToken: boolean;
  password: string;
  error?: InputError;

  onPasswordChange: (event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => void;
  onLogin: (event: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
  onRefreshToken: () => Promise<void>;
}

const useLoginHook = (): UseLoginHook => {
  const { t } = useTranslation();
  // const { state, dispatch } = useAppContext();
  const { auth } = useAppContext();
  const [passphrase, setPassphrase] = React.useState('');
  const [error, setError] = React.useState<InputError>();
  const navigate = useNavigate();

  function onPasswordChange(_: React.ChangeEvent<HTMLInputElement>, { value }: InputOnChangeData) {
    setPassphrase(value);
  }

  async function onLogin(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    if (!passphrase) {
      setError({
        content: t('app.login.err.password_required'),
        pointing: 'below',
      });
      return;
    }

    try {
      const { data } = await axios.post<LoginDto, AxiosResponse<ApiResponse<LoginResponseDto>>>(SERVER_URLS.base + SERVER_URLS.security_login, {
        passphrase,
      });

      auth.connect(data.result.access_token);

      setPassphrase('');

      navigate(APP_ROUTES.PRIV_YTD);
    } catch (error: any) {
      if (error?.response?.data?.type === 'api.err.validation') {
        ShowToast('error', t('app.err.invalid_passphrase'), t('app.err.invalid_passphrase_desc'));
        setError({
          content: t('app.err.invalid_passphrase_desc'),
          pointing: 'below',
        });
      } else {
        handleError(error, t);
      }
      setPassphrase('');
    }
  }

  async function onRefreshToken() {
    throw new Error('Not implemented!');
  }

  return { password: passphrase, error, hasAuthToken: !!auth.data.accessToken, onPasswordChange, onLogin, onRefreshToken };
};

export default useLoginHook;
