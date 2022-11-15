import type { NavigationProp } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Download: undefined;
};

export type AppNavigationProps = NavigationProp<RootStackParamList>;

export const useAppNavigation = () => useNavigation<AppNavigationProps>();
