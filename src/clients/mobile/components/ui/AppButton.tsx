import React from 'react';

import type { ViewStyle } from 'react-native';
import { Pressable, StyleSheet } from 'react-native';

import { TransparentColor } from '../theme/AppThemeStyle';
import { useAppThemeColor } from '../theme/useAppThemeColor';
import AppLoader from './AppLoader';
import { AppText } from './AppText';

interface AppButtonProps {
  text: string;
  style?: ViewStyle;
  disabled?: boolean;
  loading?: boolean;
  type?: 'primary' | 'secondary';
  onPress: () => void;
}
export const AppButton = ({ text, style, loading = false, type = 'primary', disabled = false, onPress }: AppButtonProps) => {
  const { themeStyle, themeExtras, isDarkMode } = useAppThemeColor();
  const isSecondary = type === 'secondary';

  // Style for the pressable
  const wrapperStyle = [
    styles.container,
    {
      borderColor: themeExtras.buttonBackground(isDarkMode()),
      backgroundColor: isSecondary ? themeStyle.backgroundColor : themeExtras.buttonBackground(isDarkMode()),
      opacity: disabled ? 0.5 : 1,
    },
    style,
  ];

  // Style for the text
  const textColor = {
    color: isSecondary ? themeExtras.buttonBackground(isDarkMode()) : themeExtras.buttonTextColor(isDarkMode()),
  };
  const textStyle = [styles.text, textColor];

  return (
    <Pressable disabled={disabled} style={[wrapperStyle]} onPress={onPress} android_ripple={textColor}>
      <AppText style={textStyle}>{text}</AppText>
      {loading && <AppLoader />}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    elevation: 4,
    minWidth: 150,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 1,
  },
  text: {
    lineHeight: 21,
    fontWeight: 'bold',
    paddingVertical: 8,
    letterSpacing: 0.25,
    paddingHorizontal: 12,
    backgroundColor: TransparentColor,
  },
});
