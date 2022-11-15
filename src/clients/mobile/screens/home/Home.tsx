import React from 'react';

import { StackActions } from '@react-navigation/native';
import { StyleSheet } from 'react-native';

import Logo from 'components/Logo';
import { AppButton, AppInput, AppText, AppView } from 'components/ui';
import { useAppNavigation } from 'navigation/types';

const Home = () => {
  const navigation = useAppNavigation();

  return (
    <AppView style={[styles.root]}>
      <Logo source={require('../../assets/logo.png')} />

      <AppView style={styles.formContainer}>
        <AppText style={styles.formLabel}>
          Download any youtube video as an audio or video format. All you need to do is copy the link in the box bellow.
        </AppText>

        <AppInput
          input={{
            placeholder: 'https://www.youtube.com/watch?v=2N4SjqaKPA8',
            style: {
              paddingTop: 5,
              paddingBottom: 3,
            },
          }}
        />

        <AppView style={styles.formButtonContainer}>
          <AppButton
            style={styles.formButton}
            text="Search"
            onPress={() => {
              navigation.dispatch(StackActions.push('Download'));
            }}
          />
        </AppView>
      </AppView>
    </AppView>
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
