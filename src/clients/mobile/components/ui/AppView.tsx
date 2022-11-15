import React from 'react';

import type { ViewProps } from 'react-native';
import { View } from 'react-native';

import { useAppThemeColor } from '../theme/useAppThemeColor';

type AppViewProps = ViewProps & {
  hasBorders?: boolean;
};

export const AppView = ({ style, hasBorders, ...otherProps }: AppViewProps) => {
  const { themeStyle } = useAppThemeColor();
  const borderStyle = { borderWidth: hasBorders ? 1 : 0 };

  return <View style={[themeStyle, borderStyle, style]} {...otherProps} />;
};
