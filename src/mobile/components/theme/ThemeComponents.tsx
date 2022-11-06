import React from 'react';

import type { TextProps } from 'react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { TransparentColor } from './AppThemeStyle';
import { useAppThemeColor } from './Index';

export const ThemeText = ({ style, ...otherProps }: TextProps) => {
  const { themeStyle } = useAppThemeColor();

  return <Text style={[themeStyle, style]} {...otherProps} />;
};

export type ThemeViewProps = TextProps & {
  hasBorders?: boolean;
};
export const ThemeView = ({ style, hasBorders, ...otherProps }: ThemeViewProps) => {
  const { themeStyle } = useAppThemeColor();
  const borderStyle = { borderWidth: hasBorders ? 1 : 0 };

  return <View style={[themeStyle, borderStyle, style]} {...otherProps} />;
};

interface ThemeButtonProps {
  text: string;
  onPress: () => void;
}
export const ThemeButton = ({ text, onPress }: ThemeButtonProps) => {
  const { themeStyle } = useAppThemeColor();

  const buttonBackground = {
    borderWidth: 1,
    borderColor: themeStyle.buttonBackground,
    backgroundColor: themeStyle.buttonBackground,
  };

  const buttonText = {
    color: themeStyle.buttonTextColor,
  };

  return (
    <Pressable style={[themeStyle, buttonBackground, buttonStyle.container]} onPress={onPress} android_ripple={{ color: themeStyle.color }}>
      <Text style={[themeStyle, buttonText, buttonStyle.text]}>{text}</Text>
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
