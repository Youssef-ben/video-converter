const isWebApp = () => {
  try {
    return !!window.location.href;
  } catch (error) {
    return false;
  }
};

const getMobileUrls = (forWebsocket = false) => {
  const { REACT_APP_SERVER_URL, REACT_APP_WS_SERVER_URL } = process.env;

  if (!REACT_APP_WS_SERVER_URL || !REACT_APP_SERVER_URL) {
    throw new Error('Must specify the Server URL before starting the app!!');
  }

  return forWebsocket ? REACT_APP_WS_SERVER_URL : REACT_APP_SERVER_URL;
};

const getWebUrls = (forWebsocket = false) => {
  const { REACT_APP_SERVER_URL, REACT_APP_WS_SERVER_URL } = process.env;

  if (forWebsocket) {
    return REACT_APP_WS_SERVER_URL || `ws://${window.location.host}`;
  }

  return REACT_APP_SERVER_URL || `http://${window.location.host}`;
};

export const getUrl = (forWebsocket = false) => {
  if (isWebApp()) {
    return getWebUrls(forWebsocket);
  }

  return getMobileUrls(forWebsocket);
};
