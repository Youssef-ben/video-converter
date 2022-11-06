import type { ImageSourcePropType } from 'react-native';
import { Image, StyleSheet } from 'react-native';

import { ThemeView } from './ui';

interface LogoProps {
  source: ImageSourcePropType;
  dimension?: {
    width: number;
    height: number;
  };
}

const Logo = ({ source, dimension }: LogoProps) => {
  if (dimension) {
    styles.image = {
      ...styles.image,
      width: dimension.width,
      height: dimension.height,
    };
  }

  return (
    <ThemeView style={styles.imageContainer}>
      <Image style={styles.image} resizeMode="center" source={source} />
    </ThemeView>
  );
};

export default Logo;

const styles = StyleSheet.create({
  imageContainer: {
    elevation: 10,
    marginTop: '10%',
    borderRadius: 100,
  },
  image: {
    width: 130,
    height: 130,
    alignSelf: 'center',
  },
});
