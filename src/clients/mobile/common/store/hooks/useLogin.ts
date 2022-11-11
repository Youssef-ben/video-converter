import { useState } from 'react';

import type { InputError } from 'common/types/clients/InputError';

interface LoginState {
  value: string;
  error?: InputError;
}

const useLogin = () => {
  const [state, setState] = useState<LoginState>({ value: '' });

  const onLogin = () => {};

  const onPasswordChange = (value: string) => {
    setState((current) => ({
      ...current,
      value,
    }));
  };

  return { login: state, onLogin, onPasswordChange };
};

export default useLogin;
