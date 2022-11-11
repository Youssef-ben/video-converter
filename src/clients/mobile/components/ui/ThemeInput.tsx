import React from 'react';

import type { TextInputProps, ViewProps } from 'react-native';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import { TransparentColor } from '../theme/AppThemeStyle';
import { useAppThemeColor } from '../theme/useAppThemeColor';
import { ThemeText } from './ThemeText';
import { ThemeView } from './ThemeView';

type ThemeInputProps = {
  label?: string;
  isInvalid?: boolean;
  input?: TextInputProps;
  wrapper?: ViewProps;
};

export const ThemeInput = ({ label, isInvalid = false, input, wrapper }: ThemeInputProps) => {
  const { themeStyle, isDarkMode } = useAppThemeColor();

  const containerStyle = {
    borderColor: isInvalid ? themeStyle.Error : themeStyle.InputBorderColor,
    borderTopWidth: isInvalid ? 1 : 0,
    borderLeftWidth: isInvalid ? 1 : 0,
    borderRightWidth: isInvalid ? 1 : 0,
    backgroundColor: isInvalid ? themeStyle.ErrorBackground : themeStyle.InputBackgroundColor,
  };

  const inputStyle = {
    color: isInvalid ? 'black' : themeStyle.color,
  };

  styles.container = {
    ...styles.container,
    paddingTop: label ? 5 : 0,
  };

  styles.label = {
    ...styles.label,
    color: isDarkMode() && isInvalid ? themeStyle.backgroundColor : themeStyle.color,
  };

  return (
    <>
      <ThemeView {...wrapper} style={[containerStyle, styles.container, wrapper?.style]}>
        {label && <ThemeText style={[styles.label]}>{label}</ThemeText>}

        <TextInput
          {...input}
          placeholderTextColor={themeStyle.InputPlaceholderColor}
          style={[inputStyle, styles.input, input?.style]}
          placeholder={input?.placeholder || 'Enter your text...'}
        />
      </ThemeView>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    elevation: 4,
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
    color: TransparentColor,
    backgroundColor: TransparentColor,
  },
});
