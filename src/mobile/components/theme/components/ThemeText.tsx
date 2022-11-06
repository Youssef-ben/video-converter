import type { TextProps } from 'react-native';
import { Text } from 'react-native';

import { useAppThemeColor } from '../useAppThemeColor';

export const ThemeText = ({ style, ...otherProps }: TextProps) => {
  const { themeStyle } = useAppThemeColor();

  return <Text style={[themeStyle, style]} {...otherProps} />;
};
