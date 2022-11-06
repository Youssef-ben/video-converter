import React from 'react';

import { StackActions } from '@react-navigation/native';
import { StyleSheet } from 'react-native';

import Logo from 'components/Logo';
import { ThemeButton, ThemeInput, ThemeText, ThemeView } from 'components/ui';
import { useAppNavigation } from 'navigation/types';

const Home = () => {
  const navigation = useAppNavigation();

  return (
    <ThemeView style={[styles.root]}>
      <Logo source={require('../../assets/logo.png')} dimension={{ width: 180, height: 180 }} />

      <ThemeView style={styles.formContainer}>
        <ThemeText style={styles.formLabel}>
          Download any youtube video as an audio or video format. All you need to do is copy the link in the box bellow.
        </ThemeText>

        <ThemeInput
          input={{
            placeholder: 'https://www.youtube.com/watch?v=2N4SjqaKPA8',
            style: {
              paddingTop: 5,
              paddingBottom: 3,
            },
          }}
        />

        <ThemeView style={styles.formButtonContainer}>
          <ThemeButton
            style={styles.formButton}
            text="Search"
            onPress={() => {
              navigation.dispatch(StackActions.replace('Home'));
            }}
          />
        </ThemeView>
      </ThemeView>
    </ThemeView>
  );
};

export default Home;

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
  formLabel: {
    marginBottom: 15,
    textAlign: 'justify',
  },
  formButtonContainer: {
    alignContent: 'flex-end',
    alignItems: 'flex-end',
  },
  formButton: {
    marginTop: 15,
    width: '10%',
  },
});
