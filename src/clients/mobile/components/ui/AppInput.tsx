import React from 'react';

import type { TextInputProps, ViewProps } from 'react-native';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import { TransparentColor } from '../theme/AppThemeStyle';
import { useAppThemeColor } from '../theme/useAppThemeColor';
import { AppText } from './AppText';
import { AppView } from './AppView';

type AppInputProps = {
  label?: string;
  isInvalid?: boolean;
  input?: TextInputProps;
  wrapper?: ViewProps;
};

export const AppInput = ({ label, isInvalid = false, input, wrapper }: AppInputProps) => {
  const { themeStyle, themeExtras, isDarkMode } = useAppThemeColor();

  const containerStyle = {
    borderColor: isInvalid ? themeExtras.error : themeExtras.inputBorderColor,
    borderTopWidth: isInvalid ? 1 : 0,
    borderLeftWidth: isInvalid ? 1 : 0,
    borderRightWidth: isInvalid ? 1 : 0,
    backgroundColor: isInvalid ? themeExtras.errorBackground : themeExtras.InputBackgroundColor(isDarkMode()),
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
      <AppView {...wrapper} style={[containerStyle, styles.container, wrapper?.style]}>
        {label && <AppText style={[styles.label]}>{label}</AppText>}

        <TextInput
          {...input}
          placeholderTextColor={themeExtras.inputPlaceholderColor}
          style={[inputStyle, styles.input, input?.style]}
          placeholder={input?.placeholder || 'Enter your text...'}
        />
      </AppView>
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
    paddingTop: 3,
    paddingBottom: 3,
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: TransparentColor,
    backgroundColor: TransparentColor,
  },
});
