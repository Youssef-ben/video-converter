import type { ImageSourcePropType } from 'react-native';
import { Image, StyleSheet } from 'react-native';

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

  return <Image style={styles.image} resizeMode="center" source={source} />;
};

export default Logo;

const styles = StyleSheet.create({
  image: {
    width: 130,
    height: 130,
    alignSelf: 'center',
  },
});
