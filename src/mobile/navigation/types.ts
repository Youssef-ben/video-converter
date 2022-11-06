import { useNavigation } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
};

export type AppNavigationProps = NativeStackScreenProps<RootStackParamList>;

export const useAppNavigation = () => useNavigation<AppNavigationProps>();
