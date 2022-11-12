export const VIDEO_PLACEHOLDER = process.env.REACT_APP_VID_PLACEHOLDER || 'https://www.youtube.com/watch?v=2N4SjqaKPA8';

export const LOCAL_STORAGE_KEYS = {
  AUTH: 'store/access_token',
  VYT: 'store/data',
};

export const SERVER_URLS = {
  wsBase: process.env.REACT_APP_WS_SERVER_URL || 'ws://localhost:3000',
  wsUri: '/vytc',

  base: process.env.REACT_APP_SERVER_URL || 'http://localhost:3000',
  workerFetch: '/worker/fetch',

  securityLogin: '/security/login',
  securityRefresh: '/security/refresh',
  securityLogout: '/security/logout',

  server: '/server',
};
