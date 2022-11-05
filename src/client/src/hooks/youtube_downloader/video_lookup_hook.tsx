/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { YtDownloaderActions } from '../../store/actions/youtube_download_actions';
import { useAppContext } from '../../store/contexts/app_context';
import ApiResponse from '../../types/api.response';
import { InputError } from '../../types/input_error';
import { YoutubeVideoDetails } from '../../types/vytc/video_details.model';
import { SERVER_URLS } from '../../utils/constants';
import { getAccessToken, handleError, isValidUrl, saveYoutubeData } from '../../utils/helpers';

const TEXT = {
  invalid_url_msg: 'app.yt.err.invalid_url_msg',
};

type UseVideoLookupHook = {
  urlValue: string;
  loading: boolean;
  inputError?: InputError;

  onYoutubeUrlChange: (valueChange: string) => void;
  fetchYoutubeDetails: (event: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
};

const useVideoLookupHook = (): UseVideoLookupHook => {
  const { t } = useTranslation();
  const { dispatch } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();

  const [urlValue, setUrlValue] = React.useState<string>('');
  const [inputError, setInputError] = React.useState<InputError>();
  const [loading, setLoading] = React.useState(false);

  // Define on Change value for the URL Input.
  function onYoutubeUrlChange(valueChange: string): void {
    setUrlValue(valueChange);
    setInputError(undefined);
  }

  // Define Search button action.
  async function fetchYoutubeDetails(event: React.MouseEvent<HTMLButtonElement>): Promise<void> {
    event.preventDefault();
    setLoading(true);

    // Validate the url
    if (!isValidUrl(urlValue)) {
      setLoading(false);
      setInputError({
        content: t(TEXT.invalid_url_msg),
        pointing: 'below',
      });
      return;
    }

    // Fetch data
    try {
      const { data } = await axios.get<ApiResponse<YoutubeVideoDetails>>(SERVER_URLS.base + SERVER_URLS.worker_fetch, {
        params: {
          video_url: urlValue,
        },
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });

      // Set the values and go to next page.
      setLoading(false);

      dispatch({
        type: YtDownloaderActions.AddData,
        payload: {
          ytData: data.result,
        },
      });

      saveYoutubeData(data.result);

      navigate(`${location.pathname}/preview`);
    } catch (error: any) {
      setLoading(false);
      handleError(error, t);
    }
  }

  return {
    urlValue,
    inputError,
    loading,

    onYoutubeUrlChange,
    fetchYoutubeDetails,
  };
};

export default useVideoLookupHook;
