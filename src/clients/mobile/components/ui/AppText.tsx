import type { TextProps } from 'react-native';
import { Text } from 'react-native';

import { TransparentColor } from '../theme/AppThemeStyle';
import { useAppThemeColor } from '../theme/useAppThemeColor';

interface AppTextProps extends TextProps {
  hasError?: boolean;
}
export const AppText = ({ hasError = false, style, ...otherProps }: AppTextProps) => {
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
      paddingHorizontal: 10,
      color: themeStyle.Error,
    },
  ];

  return <Text style={elementStyle} {...otherProps} />;
};
