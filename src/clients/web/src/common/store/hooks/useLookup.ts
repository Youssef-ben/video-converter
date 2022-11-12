import { useState } from 'react';

import { useTranslation } from 'react-i18next';

import type { InputError } from '../../types/clients/InputError';
import { isValidYoutubeUrl } from './helpers';

interface LookupState {
  value: string;
  loading: boolean;
  error?: InputError;
}
const INITIAL_VALUES: LookupState = { value: '', loading: false };

function useLookup() {
  const { t } = useTranslation();
  const [state, setState] = useState<LookupState>(INITIAL_VALUES);

  const onSearchUrlChange = (text: string) => {
    setState((current) => ({
      ...current,
      value: text,
    }));
  };

  const search = async (): Promise<boolean> => {
    setState((current) => ({ ...current, loading: true }));

    // Validate the youtube URL.
    if (!state.value || !isValidYoutubeUrl(state.value)) {
      setState((current) => ({
        ...current,
        loading: false,
        error: {
          content: t('app.lookup.err.value_required'),
          pointing: 'below',
        },
      }));
      return false;
    }

    // Call Api
    // Save video details to storage.

    setState(INITIAL_VALUES);
    return false;
  };

  return { lookup: state, search, onSearchUrlChange };
}

export default useLookup;
