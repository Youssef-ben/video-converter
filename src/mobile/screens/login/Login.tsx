import { StyleSheet } from 'react-native';

import { ThemeText, ThemeView } from 'components/ui';

const Login = () => {
  return (
    <ThemeView style={[styles.simpleView]}>
      <ThemeText>This is a simple text inside the Login View</ThemeText>
    </ThemeView>
  );
};

export default Login;

const styles = StyleSheet.create({
  simpleView: {
    flex: 1,
    marginTop: '8%',
  },
});
