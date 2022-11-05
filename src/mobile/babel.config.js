module.exports = function(api) {
  api.cache(true);
  return {
    presets: [
      'babel-preset-expo',
      ['module:metro-react-native-babel-preset', { useTransformReactJSXExperimental: true }],
    ],
    plugins: [
      [
        'module-resolver',
        {
          extensions: [
            '.ts',
            '.tsx',
            '.android.tsx',
            '.ios.tsx',
          ],
          root: ['./src'],
        },
      ],

      'react-native-reanimated/plugin',
    ],
  };
};
