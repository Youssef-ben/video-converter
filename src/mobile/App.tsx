/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
import React from 'react';

import { StatusBar } from 'expo-status-bar';
import { Image, Platform, Pressable, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ThemeButton, ThemeInput, ThemeText, ThemeView, useAppThemeColor } from 'components/theme/Index';
import useIsAppReady from 'hooks/useIsAppReady';

export default function App() {
  const { isAppReady } = useIsAppReady();
  const { themeStyle, isDarkMode } = useAppThemeColor();

  if (!isAppReady) {
    return null;
  }

  styles.card = {
    ...styles.card,
    backgroundColor: themeStyle.backgroundColor,
    borderColor: themeStyle.borderColor,
    shadowColor: themeStyle.shadowColor,
  };

  styles.imageContainer = {
    ...styles.imageContainer,
    borderColor: themeStyle.borderColor,
    shadowColor: themeStyle.shadowColor,
  };

  return (
    <SafeAreaProvider style={[themeStyle, styles.container]}>
      <ThemeView style={[styles.simpleView]}>
        <ThemeText>This is a simple text inside a view</ThemeText>
      </ThemeView>

      <ThemeView style={styles.card}>
        <Pressable android_ripple={{ color: themeStyle.color }} style={({ pressed }) => (pressed ? styles.pressable : null)} onPress={() => {}}>
          <Pressable android_ripple={{ color: themeStyle.color }} onPress={() => {}}>
            <ThemeView style={styles.imageContainer}>
              <Image resizeMode="contain" source={require('./assets/adaptive-icon.png')} style={styles.image} />
            </ThemeView>

            <ThemeView style={styles.bodyContainer}>
              <ThemeText style={styles.title}>{'This a Title'}</ThemeText>
              <ThemeText
                style={{
                  marginVertical: 2,
                  marginHorizontal: 2,
                }}
              >
                {'This is the card content section where you can add anything you want'}
              </ThemeText>
            </ThemeView>
          </Pressable>
        </Pressable>
      </ThemeView>

      <ThemeView style={[styles.buttonContainer]}>
        <ThemeButton text="Primary" onPress={() => {}} style={styles.marginBottom} />
        <ThemeButton text="Secondary" onPress={() => {}} type="secondary" />
      </ThemeView>

      <ThemeView style={[styles.textContainer]}>
        <ThemeInput
          wrapper={{
            style: styles.marginBottom,
          }}
        />

        <ThemeInput
          isInvalid
          wrapper={{
            style: styles.marginBottom,
          }}
        />

        <ThemeInput
          label="Input Field"
          wrapper={{
            style: styles.marginBottom,
          }}
          input={{
            onChangeText(text) {
              console.log(text);
            },
          }}
        />

        <ThemeInput
          label="Input Field"
          isInvalid
          input={{
            onChangeText(text) {
              console.log(text);
            },
          }}
        />
      </ThemeView>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  simpleView: {
    margin: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },

  buttonContainer: {
    margin: 10,
  },
  textContainer: {
    marginTop: 10,
  },
  marginBottom: {
    marginBottom: 10,
  },

  card: {
    minWidth: '60%',
    maxWidth: '70%',
    elevation: 8,
    borderWidth: 0,
    borderRadius: 5,
    marginVertical: 10,
    marginHorizontal: 40,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',

    backgroundColor: '#d0d0c0',
    borderColor: '#323232',
    shadowColor: '#323232',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  pressable: {
    opacity: 0.4,
  },
  imageContainer: {
    borderRadius: 5,
    borderBottomEndRadius: 0,
    borderBottomStartRadius: 0,
    overflow: 'hidden',
    elevation: 5,
    borderColor: '#323232',
    shadowColor: '#323232',
  },
  bodyContainer: {
    padding: 8,
    alignContent: 'center',
    alignItems: 'flex-start',
    borderTopEndRadius: 0,
    borderTopStartRadius: 0,
    backgroundColor: 'transparent',
  },
  image: {
    borderRadius: 5,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    width: '100%',
    height: 150,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginVertical: 5,
    backgroundColor: 'transparent',
  },
});
