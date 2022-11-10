// Learn more https://docs.expo.io/guides/customizing-metro
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

const { getDefaultConfig } = require('expo/metro-config');

let config = getDefaultConfig(__dirname);

config.transformer.getTransformOptions = async () => ({
  transform: {
    experimentalImportSupport: true,
    inlineRequires: true,
  },
});

config.watchFolders = [...config.watchFolders, path.join(__dirname, '..', 'common')];
console.log(config.watchFolders);
module.exports = config;
