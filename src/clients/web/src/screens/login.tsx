import { useTranslation } from "react-i18next";
import type { InputOnChangeData } from "semantic-ui-react";
import { Button, Container, Form, Grid } from "semantic-ui-react";

import useLogin from "common/store/hooks/useLogin";
import AppLogo from "components/app_logo";

function Login() {
  const { login, onPasswordChange } = useLogin();
  const { t } = useTranslation();
  const text = {
    placeholder: 'app.login.placeholder.password',
    button: 'app.login.btn',
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onChangeHandler = (_: React.ChangeEvent<HTMLInputElement>, { value }: InputOnChangeData) => {
    onPasswordChange(value)
  }

  return (
    <Container>
      <Grid className="login-page">
        <Grid.Column textAlign="center">
          <AppLogo />

          <Form size="large">
            <Form.Input
              fluid
              icon="lock"
              type="password"
              iconPosition="left"
              placeholder={t(text.placeholder)}
              value={login.value}
              onChange={onChangeHandler}
            />

            <Button primary fluid size="large">
              {t(text.button)}
            </Button>
          </Form>
        </Grid.Column>
      </Grid>
    </Container>
  );
}


export default Login;