import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, useColorScheme, View } from 'react-native';

export default function App() {
  const color = useColorScheme();
  console.log(color);
  return (
    <View style={[styles.container, color ==='light' ? styles.light : styles.dark ]}>
      <Text style={[color ==='light' ? styles.light : styles.dark ]}>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  light: {
    color: '#000',
    backgroundColor: '#fff',
    tintColor: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
  },
  dark: {
    color: '#fffff',
    backgroundColor: '#000',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
  },
});
