import * as dotenv from 'dotenv';
dotenv.config();

module.exports = {
  name: 'vytc',
  slug: 'vytc',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'automatic',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#d0d0c0',
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ['**/*'],
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#d0d0c0',
    },
  },
  extra: {
    REACT_APP_SERVER_URL: process.env.REACT_APP_SERVER_URL,
    REACT_APP_WS_SERVER_URL: process.env.REACT_APP_WS_SERVER_URL,
  },
};
