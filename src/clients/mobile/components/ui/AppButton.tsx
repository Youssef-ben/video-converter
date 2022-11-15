import React from 'react';

import type { ViewStyle } from 'react-native';
import { Pressable, StyleSheet } from 'react-native';

import { TransparentColor } from '../theme/AppThemeStyle';
import { useAppThemeColor } from '../theme/useAppThemeColor';
import { AppText } from './AppText';

interface AppButtonProps {
  text: string;
  style?: ViewStyle;
  type?: 'primary' | 'secondary';
  disabled?: boolean;
  onPress: () => void;
}
export const AppButton = ({ text, style, type = 'primary', disabled = false, onPress }: AppButtonProps) => {
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
      <AppText style={textStyle}>{text}</AppText>
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
