import React from 'react';

import type { TextInputProps, ViewProps } from 'react-native';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import { TransparentColor } from '../AppThemeStyle';
import { useAppThemeColor } from '../useAppThemeColor';
import { ThemeText } from './ThemeText';
import { ThemeView } from './ThemeView';

type ThemeInputProps = {
  label?: string;
  input?: TextInputProps;
  wrapper?: ViewProps;
};

export const ThemeInput = ({ label, input, wrapper }: ThemeInputProps) => {
  const { themeStyle } = useAppThemeColor();

  const containerStyle = {
    borderColor: themeStyle.InputBorderColor,
    backgroundColor: themeStyle.InputBackgroundColor,
  };

  const inputStyle = {
    color: themeStyle.color,
  };

  textInputStyle.container = {
    ...textInputStyle.container,
    paddingTop: label ? 5 : 0,
  };

  return (
    <ThemeView {...wrapper} style={[containerStyle, textInputStyle.container, wrapper?.style]}>
      {label && <ThemeText style={[{ color: themeStyle.color }, textInputStyle.label]}>{label}</ThemeText>}
      <TextInput
        placeholderTextColor={themeStyle.InputPlaceholderColor}
        style={[inputStyle, textInputStyle.input]}
        placeholder={input?.placeholder || 'Enter your text...'}
        {...input}
      />
    </ThemeView>
  );
};
const textInputStyle = StyleSheet.create({
  container: {
    elevation: 2,
    paddingTop: 0,
    minWidth: '90%',
    borderBottomWidth: 1,
    paddingRight: 6,
    paddingLeft: 10,
  },
  input: {
    paddingTop: 2,
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    backgroundColor: TransparentColor,
  },
});
