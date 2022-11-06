import React from 'react';

import { StyleSheet } from 'react-native';

import Logo from 'components/Logo';
import { ThemeView } from 'components/ui';

const Preview = () => {
  return (
    <ThemeView style={[styles.root]}>
      <Logo source={require('../../assets/logo.png')} dimension={{ width: 180, height: 180 }} />

      <ThemeView style={styles.formContainer} />
    </ThemeView>
  );
};

export default Preview;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: 12,
    paddingHorizontal: 5,
    alignItems: 'center',
    alignContent: 'center',
  },

  formContainer: {
    marginTop: '10%',
    marginHorizontal: 15,
  },
});
