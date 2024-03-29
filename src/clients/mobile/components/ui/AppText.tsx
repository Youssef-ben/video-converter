import type { TextProps } from 'react-native';
import { Text } from 'react-native';

import { scale } from 'utils/TextScale';

import { TransparentColor } from '../theme/AppThemeStyle';
import { useAppThemeColor } from '../theme/useAppThemeColor';

interface AppTextProps extends TextProps {
  hasError?: boolean;
}
export const AppText = ({ hasError = false, style, ...otherProps }: AppTextProps) => {
  const { themeStyle, themeExtras } = useAppThemeColor();

  const elementStyle = [
    themeStyle,
    {
      fontSize: scale(13),
      backgroundColor: TransparentColor,
    },
    style,
    hasError && {
      marginBottom: 8,
      paddingVertical: 4,
      paddingHorizontal: 10,
      color: themeExtras.error,
    },
  ];

  return <Text style={elementStyle} {...otherProps} />;
};
