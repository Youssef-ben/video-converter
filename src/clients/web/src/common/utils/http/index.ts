/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import axios from 'axios';
import applyCaseMiddleware from 'axios-case-converter';

import type { VytcContextState } from 'common/store/vytc-context/provider';
import type ApiResponse from 'common/types/server/response/api.response';
import ErrorApiResponse from 'common/types/server/response/error.api.response';

import { SERVER_URLS } from '../constants';

// Convert all responses to CamelCase.
const AppHttp = applyCaseMiddleware(
  axios.create({
    baseURL: SERVER_URLS.base,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }),
  {
    ignoreHeaders: true,
  }
);

// Interceptors
interface InterceptorProps extends VytcContextState {
  navigation: Function; // eslint-disable-line @typescript-eslint/ban-types
}
export const setupAxiosRequestInterceptor = ({ auth, navigation }: InterceptorProps) => {
  AppHttp.interceptors.request.use(
    async (config: AxiosRequestConfig) => {
      // If public URL, nothing to do.
      if (config.url?.includes(SERVER_URLS.securityLogin) || config.url?.includes(SERVER_URLS.server)) {
        return config;
      }

      // If Not Authenticated, redirect to login page.
      if (!auth.isAuthenticated) {
        navigation();
        return config;
      }

      // Add the authorization header
      const newConfig = { ...config };

      newConfig.headers = {
        ...newConfig.headers,
        Authorization: `Bearer ${auth.accessToken}`,
      };

      return newConfig;
    },
    (error) => {
      Promise.reject(error);
    }
  );
};

// Axios Actions
interface AppAxiosResult<PayloadType> {
  data?: PayloadType;
  error?: ErrorApiResponse;
}

function handleError(err: any): ErrorApiResponse {
  const error = err as AxiosError<ErrorApiResponse, any>;
  if (error.response) {
    // Server returned an error
    return error.response.data;
  }

  // Any Other Error
  return new ErrorApiResponse(undefined, err as Error);
}

export async function AxiosPost<PayloadType, ResponseType>(url: string, payload: PayloadType): Promise<AppAxiosResult<ResponseType>> {
  try {
    const { data } = await AppHttp.post<ResponseType, AxiosResponse<ApiResponse<ResponseType>>, PayloadType>(url, payload);
    return {
      data: data.result,
    };
  } catch (err) {
    return {
      error: handleError(err),
    };
  }
}

export default AppHttp;
