import React from 'react';

import { StackActions } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';

import useLookup from 'common/store/hooks/useLookup';
import Logo from 'components/Logo';
import { AppButton, AppInput, AppText, AppView } from 'components/ui';
import { useAppNavigation } from 'navigation/types';

const translations = {
  description: 'app.lookup.description',
  btnSearch: 'app.lookup.btn',
};

const Home = () => {
  const { t } = useTranslation();
  const navigation = useAppNavigation();

  const { lookup, search, onSearchUrlChange } = useLookup();

  const searchHandler = async () => {
    const result = await search();

    if (result) {
      navigation.dispatch(StackActions.push('Download'));
    }
  };

  return (
    <AppView style={[styles.root]}>
      <Logo source={require('../../assets/logo.png')} />

      <AppView style={styles.formContainer}>
        <AppText style={styles.formLabel}>{t(translations.description)}</AppText>

        <AppInput
          isInvalid={!!lookup.error}
          input={{
            value: lookup.value,
            onChangeText: onSearchUrlChange,
            placeholder: 'https://www.youtube.com/watch?v=2N4SjqaKPA8',
            style: {
              paddingTop: 5,
              paddingBottom: 3,
            },
          }}
        />

        <AppView style={styles.formButtonContainer}>
          <AppButton style={styles.formButton} text={t(translations.btnSearch)} onPress={searchHandler} />
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
