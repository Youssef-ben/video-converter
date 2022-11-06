import { StyleSheet } from 'react-native';

import { ThemeText, ThemeView } from 'components/ui';

const Login = () => {
  return (
    <ThemeView style={[styles.root]}>
      <ThemeText>This is a simple text inside the Login View</ThemeText>
    </ThemeView>
  );
};

export default Login;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: 12,
  },
});
