import { useState } from 'react';

import { useTranslation } from 'react-i18next';

import type { YoutubeVideoPayload } from 'common/types/server';
import { SERVER_URLS } from 'common/utils/constants';
import { axiosGet } from 'common/utils/http';

import { isValidYoutubeUrl } from './helpers';
import type { InputError } from '../../types/clients/InputError';
import { useAppContext } from '../vytc-context/provider';

interface LookupState {
  value: string;
  loading: boolean;
  error?: InputError;
}
const INITIAL_VALUES: LookupState = { value: '', loading: false };

function useLookup() {
  const { t } = useTranslation();
  const { clear, persist } = useAppContext();

  const [state, setState] = useState<LookupState>(INITIAL_VALUES);

  const onSearchUrlChange = (text: string) => {
    setState((current) => ({
      ...current,
      value: text,
    }));
  };

  const validate = (): string | undefined => {
    if (!state.value) {
      return 'app.lookup.err.value_required';
    }

    if (!isValidYoutubeUrl(state.value)) {
      return 'app.lookup.err.invalid_url';
    }

    return undefined;
  };

  const search = async (): Promise<boolean> => {
    setState((current) => ({ ...current, loading: true }));

    // Validate the youtube URL.
    const errorMsg = validate();

    if (errorMsg) {
      setState((current) => ({
        ...current,
        loading: false,
        error: {
          content: t(errorMsg),
          pointing: 'below',
        },
      }));
      return false;
    }

    // Call Api
    const { data, error } = await axiosGet<YoutubeVideoPayload>(SERVER_URLS.workerFetch, {
      videoUrl: state.value,
    });

    // Check for errors
    if (error) {
      setState((current) => ({
        value: current.value,
        loading: false,
        error: {
          content: t(error?.type as string),
          fromServer: true,
        },
      }));
      return false;
    }

    // Reset the vyt object
    clear();

    // Save video details to storage.
    persist(data as YoutubeVideoPayload);
    setState(INITIAL_VALUES);
    return true;
  };

  return { lookup: state, search, onSearchUrlChange };
}

export default useLookup;
