import React from 'react';

import type { TextProps, ViewStyle } from 'react-native';
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
  style?: ViewStyle;
  onPress: () => void;
}
export const ThemeButton = ({ text, style, onPress }: ThemeButtonProps) => {
  const { themeStyle, isLightMode } = useAppThemeColor();

  const rippleEffect = { color: isLightMode() ? themeStyle.color : themeStyle.color };
  const buttonBackground = {
    borderColor: themeStyle.buttonBackground,
    backgroundColor: themeStyle.buttonBackground,
  };

  return (
    <ThemeView hasBorders style={[buttonBackground, styles.container, style]}>
      <Pressable onPress={onPress} android_ripple={rippleEffect}>
        <ThemeView style={[styles.button]}>
          <ThemeText style={[{ color: themeStyle.buttonTextColor }, styles.buttonText]}>{text}</ThemeText>
        </ThemeView>
      </Pressable>
    </ThemeView>
  );
};

const styles = StyleSheet.create({
  container: {
    elevation: 4,
    minWidth: '30%',
  },

  button: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: TransparentColor,
  },
  buttonText: {
    flex: 1,
    padding: 6,
    textAlign: 'center',
    backgroundColor: TransparentColor,
  },
});
