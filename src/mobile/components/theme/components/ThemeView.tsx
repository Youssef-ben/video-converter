import React from 'react';

import type { ViewProps } from 'react-native';
import { View } from 'react-native';

import { useAppThemeColor } from '../useAppThemeColor';

type ThemeViewProps = ViewProps & {
  hasBorders?: boolean;
};

export const ThemeView = ({ style, hasBorders, ...otherProps }: ThemeViewProps) => {
  const { themeStyle } = useAppThemeColor();
  const borderStyle = { borderWidth: hasBorders ? 1 : 0 };

  return <View style={[themeStyle, borderStyle, style]} {...otherProps} />;
};
