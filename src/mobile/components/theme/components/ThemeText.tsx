import type { TextProps } from 'react-native';
import { Text } from 'react-native';

import { TransparentColor } from '../AppThemeStyle';
import { useAppThemeColor } from '../useAppThemeColor';

export const ThemeText = ({ style, ...otherProps }: TextProps) => {
  const { themeStyle } = useAppThemeColor();

  const elementStyle = [
    themeStyle,
    {
      backgroundColor: TransparentColor,
    },
    style,
  ];

  return <Text style={elementStyle} {...otherProps} />;
};
