export const LOCAL_STORAGE_KEYS = {
  AUTH: 'store/access_token',
  VYT: 'store/data',
};

export const SERVER_URLS = {
  ws_base: process.env.REACT_APP_WS_SERVER_URL || 'ws://localhost:3000',
  ws_uri: '/vytc',

  base: process.env.REACT_APP_SERVER_URL || 'http://localhost:3000',
  worker_fetch: '/worker/fetch',

  security_login: '/security/login',
  security_refresh: '/security/refresh',
  security_logout: '/security/logout',

  server: '/server',
};
