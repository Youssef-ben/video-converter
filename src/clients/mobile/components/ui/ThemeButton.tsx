import React from 'react';

import type { ViewStyle } from 'react-native';
import { Pressable, StyleSheet } from 'react-native';

import { TransparentColor } from '../theme/AppThemeStyle';
import { useAppThemeColor } from '../theme/useAppThemeColor';
import { ThemeText } from './ThemeText';

interface ThemeButtonProps {
  text: string;
  style?: ViewStyle;
  type?: 'primary' | 'secondary';
  disabled?: boolean;
  onPress: () => void;
}
export const ThemeButton = ({ text, style, type = 'primary', disabled = false, onPress }: ThemeButtonProps) => {
  const { themeStyle } = useAppThemeColor();
  const isSecondary = type === 'secondary';

  // Style for the pressable
  const wrapperStyle = [
    themeStyle,
    styles.container,
    {
      borderColor: themeStyle.buttonBackground,
      backgroundColor: isSecondary ? themeStyle.backgroundColor : themeStyle.buttonBackground,
      opacity: disabled ? 0.5 : 1,
    },
    style,
  ];

  // Style for the text
  const textColor = {
    color: isSecondary ? themeStyle.buttonBackground : themeStyle.buttonTextColor,
  };
  const textStyle = [themeStyle, styles.text, textColor];

  return (
    <Pressable disabled={disabled} style={[wrapperStyle]} onPress={onPress} android_ripple={textColor}>
      <ThemeText style={textStyle}>{text}</ThemeText>
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
