import type { TextProps } from 'react-native';
import { Text } from 'react-native';

import { TransparentColor } from '../theme/AppThemeStyle';
import { useAppThemeColor } from '../theme/useAppThemeColor';

interface ThemeTextProps extends TextProps {
  hasError?: boolean;
}
export const ThemeText = ({ hasError = false, style, ...otherProps }: ThemeTextProps) => {
  const { themeStyle } = useAppThemeColor();

  const elementStyle = [
    themeStyle,
    {
      backgroundColor: TransparentColor,
    },
    style,
    hasError && {
      marginBottom: 8,
      paddingVertical: 4,
      fontWeight: '800',
      paddingHorizontal: 10,
      color: themeStyle.Error,
    },
  ];

  return <Text style={elementStyle} {...otherProps} />;
};
