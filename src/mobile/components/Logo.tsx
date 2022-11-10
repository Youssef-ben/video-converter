import type { ImageSourcePropType } from 'react-native';
import { Image, StyleSheet, useWindowDimensions } from 'react-native';

import { useAppThemeColor } from './theme/useAppThemeColor';
import { ThemeView } from './ui';

interface LogoProps {
  source: ImageSourcePropType;
  dimension?: {
    width: number;
    height: number;
  };
}

const Logo = ({ source, dimension }: LogoProps) => {
  const { isLightMode } = useAppThemeColor();
  const { width } = useWindowDimensions();

  const autoSize = width < 400 ? 126 : 130;
  const logoDimension = isLightMode() ? autoSize : 132;

  styles.image = {
    ...styles.image,
    width: dimension ? dimension.width : logoDimension,
    height: dimension ? dimension.height : logoDimension,
  };

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
