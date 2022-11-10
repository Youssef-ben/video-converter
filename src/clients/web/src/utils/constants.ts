/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-non-null-assertion */

const VIDEO_PLACEHOLDER = process.env.REACT_APP_VID_PLACEHOLDER!;
const VID_TITLE_PLACEHOLDER = process.env.REACT_APP_VID_TITLE_PLACEHOLDER!;

const SERVER_URLS = {
  ws_base: process.env.REACT_APP_WS_SERVER_URL!,
  ws_uri: '/vytc',

  base: process.env.REACT_APP_SERVER_URL!,
  worker_fetch: '/worker/fetch',

  security_login: '/security/login',
  security_refresh: '/security/refresh',
  security_logout: '/security/logout',
};

const LOCAL_STORAGE_KEYS = {
  token: 'ACCESS_TOKEN',
  data: 'DATA',
};

export { VIDEO_PLACEHOLDER, VID_TITLE_PLACEHOLDER, SERVER_URLS, LOCAL_STORAGE_KEYS };
