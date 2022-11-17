import React from 'react';

import type { ImageSourcePropType } from 'react-native';
import { Image, Platform, Pressable, StyleSheet } from 'react-native';

import { TransparentColor } from '../theme/AppThemeStyle';
import { useAppThemeColor } from '../theme/useAppThemeColor';
import { AppText } from './AppText';
import { AppView } from './AppView';

interface AppCardProps {
  logo?: ImageSourcePropType;
  title?: string;
  content?: string;
  hasBorder?: boolean;
}
const AppCard = ({ logo, title, content, hasBorder = true }: AppCardProps) => {
  const { themeStyle } = useAppThemeColor();

  styles.card = {
    ...styles.card,
    backgroundColor: themeStyle.backgroundColor,
    borderColor: themeStyle.borderColor,
    shadowColor: themeStyle.shadowColor,
    borderWidth: hasBorder ? 1 : 0,
  };

  styles.imageContainer = {
    ...styles.imageContainer,
    borderColor: themeStyle.borderColor,
    shadowColor: themeStyle.shadowColor,
  };

  return (
    <AppView style={styles.card}>
      <Pressable
        android_ripple={{ color: themeStyle.color }}
        onPress={() => {
          /* */
        }}
      >
        {logo && (
          <AppView style={styles.imageContainer}>
            <Image resizeMode="contain" source={logo} style={styles.image} />
          </AppView>
        )}

        <AppView style={styles.bodyContainer}>
          {title && <AppText style={styles.title}>{title}</AppText>}
          {content && <AppText style={styles.content}>{content}</AppText>}
        </AppView>
      </Pressable>
    </AppView>
  );
};

export default AppCard;

const styles = StyleSheet.create({
  card: {
    minWidth: '60%',
    maxWidth: '70%',
    elevation: 8,
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 10,
    marginHorizontal: 40,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',

    backgroundColor: TransparentColor,
    borderColor: TransparentColor,
    shadowColor: TransparentColor,
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },

  imageContainer: {
    borderRadius: 5,
    borderBottomEndRadius: 0,
    borderBottomStartRadius: 0,
    overflow: 'hidden',
    elevation: 5,
    borderColor: TransparentColor,
    shadowColor: TransparentColor,
  },
  bodyContainer: {
    padding: 8,
    alignContent: 'center',
    alignItems: 'flex-start',
    borderTopEndRadius: 0,
    borderTopStartRadius: 0,
    backgroundColor: TransparentColor,
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
    backgroundColor: TransparentColor,
  },
  content: {
    margin: 2,
  },
});
