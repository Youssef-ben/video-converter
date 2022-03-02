/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios, { AxiosResponse } from 'axios';
import ShowToast from '../components/utils/custom_toast';
import ApiResponse from '../types/api.response';
import { LoginDto, LoginResponseDto } from '../types/vytc/security.models';
import { YoutubeVideoDetails } from '../types/vytc/video_details.model';
import { LOCAL_STORAGE_KEYS, SERVER_URLS } from './constants';

/* eslint-disable @typescript-eslint/no-explicit-any */
const validQueryDomains = new Set(['youtube.com', 'www.youtube.com', 'm.youtube.com', 'music.youtube.com', 'gaming.youtube.com']);
const validPathDomains = /^https?:\/\/(youtu\.be\/|(www\.)?youtube\.com\/(embed|v|shorts)\/)/;
const idRegex = /^[a-zA-Z0-9-_]{11}$/;

/**
 * Validate the Youtube ID.
 *
 * NOTE: Taken from the {ytdl-core}
 *
 * @param id The id from the youtube link.
 * @returns True, if valid, False: otherwise.
 */
const validateID = (id: string) => idRegex.test(id);

/**
 * Validate the given youtube link.
 *
 * NOTE: Taken from the {ytdl-core}
 *
 * @param link Youtube link.
 * @returns True, if valid, False, otherwise.
 */
export const isValidUrl = (link: string): boolean => {
  let parsed: URL;
  try {
    parsed = new URL(link);
  } catch (error) {
    return false;
  }

  let id = parsed.searchParams.get('v');

  if (validPathDomains.test(link) && !id) {
    const paths = parsed.pathname.split('/');
    id = parsed.host === 'youtu.be' ? paths[1] : paths[2];
  } else if (parsed.hostname && !validQueryDomains.has(parsed.hostname)) {
    return false;
  }

  if (!id) {
    return false;
  }

  id = id.substring(0, 11);
  if (!validateID(id)) {
    return false;
  }

  return true;
};

export const handleError = (err: any, translateFunc: any): void => {
  if (err?.response?.data) {
    ShowToast('error', translateFunc(err.response.data.type), translateFunc(`${err.response.data.type}_desc`));
  } else {
    let msg = err.message;
    if (err.message.toLowerCase().includes('network')) {
      msg = translateFunc('ws.err.connection_lost');
    }

    ShowToast('error', translateFunc('app.err.unhandled'), msg);
  }
};

export const getYoutubeData = (): YoutubeVideoDetails | undefined => {
  const data = localStorage.getItem(LOCAL_STORAGE_KEYS.data);
  if (!data) {
    return undefined;
  }

  return JSON.parse(data);
};

export const saveYoutubeData = (ytData: YoutubeVideoDetails | undefined) => {
  if (!ytData) {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.data);
    return;
  }

  localStorage.setItem(LOCAL_STORAGE_KEYS.data, JSON.stringify(ytData));
};

export const getAccessToken = (): string => localStorage.getItem(LOCAL_STORAGE_KEYS.token) || '';

let timeInterval: NodeJS.Timer;

export const refreshAccessToken = async (): Promise<void> => {
  if (timeInterval) {
    return;
  }

  timeInterval = setInterval(async () => {
    const { data } = await axios.get<LoginDto, AxiosResponse<ApiResponse<LoginResponseDto>>>(SERVER_URLS.base + SERVER_URLS.security_refresh, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });

    localStorage.setItem(LOCAL_STORAGE_KEYS.token, data.result.access_token);
  }, 10 * 60 * 1000); // Minutes after which we should refresh the token
};

export const clearAccessToken = (): void => {
  setTimeout(() => {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.token);
    clearInterval(timeInterval);
    window.location.reload();
  }, 4000);
};
