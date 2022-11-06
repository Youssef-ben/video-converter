import React from 'react';

import type { ViewStyle } from 'react-native';
import { Pressable, StyleSheet } from 'react-native';

import { TransparentColor } from '../AppThemeStyle';
import { useAppThemeColor } from '../useAppThemeColor';
import { ThemeText } from './ThemeText';

interface ThemeButtonProps {
  text: string;
  style?: ViewStyle;
  type?: 'primary' | 'secondary';
  onPress: () => void;
}
export const ThemeButton = ({ text, style, type = 'primary', onPress }: ThemeButtonProps) => {
  const { themeStyle } = useAppThemeColor();

  const buttonBackground = {
    borderWidth: 1,
    borderColor: themeStyle.buttonBackground,
    backgroundColor: themeStyle.buttonBackground,
  };

  const buttonText = {
    color: themeStyle.buttonTextColor,
  };

  const secondaryBtn = {
    button: {
      borderWidth: 1,
      borderColor: themeStyle.buttonBackground,
      backgroundColor: themeStyle.backgroundColor,
    },
    text: {
      color: themeStyle.buttonBackground,
    },
  };

  return (
    <Pressable
      style={[themeStyle, buttonBackground, buttonStyle.container, type === 'secondary' && secondaryBtn.button, style]}
      onPress={onPress}
      android_ripple={{ color: themeStyle.color }}
    >
      <ThemeText style={[themeStyle, buttonText, buttonStyle.text, type === 'secondary' && secondaryBtn.text]}>{text}</ThemeText>
    </Pressable>
  );
};
const buttonStyle = StyleSheet.create({
  container: {
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 150,
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
