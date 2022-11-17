import { getUrl } from './helpers';

export const VIDEO_PLACEHOLDER = process.env.REACT_APP_VID_PLACEHOLDER || 'https://www.youtube.com/watch?v=2N4SjqaKPA8';

export const LOCAL_STORAGE_KEYS = {
  AUTH: 'store/access_token',
  VYT: 'store/vyt',
  PERMISSIONS: 'store/vyt/permissions',
};

export const SERVER_URLS = {
  wsBase: getUrl(true),
  wsUri: '/vytc',

  base: getUrl(),
  workerFetch: '/worker/fetch',

  securityLogin: '/security/login',
  securityRefresh: '/security/refresh',
  securityLogout: '/security/logout',

  server: '/server',
};
