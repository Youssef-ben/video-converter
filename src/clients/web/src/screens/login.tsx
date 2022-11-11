import { useTranslation } from "react-i18next";
import type { InputOnChangeData } from "semantic-ui-react";
import { Button, Container, Form, Grid } from "semantic-ui-react";

import useLogin from "common/store/hooks/useLogin";
import AppLogo from "components/app_logo";

function Login() {
  const { login, onLogin, onPasswordChange } = useLogin();
  const { t } = useTranslation();
  const text = {
    placeholder: 'app.login.placeholder.password',
    button: 'app.login.btn',
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onChangeHandler = (_: React.ChangeEvent<HTMLInputElement>, { value }: InputOnChangeData) => {
    onPasswordChange(value)
  }

  const onClickHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    await onLogin();
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
              value={login.value}
              error={!login?.error?.fromServer && login.error}
              placeholder={t(text.placeholder)}
              onChange={onChangeHandler}
            />

            <Button primary fluid size="large" onClick={onClickHandler}>
              {t(text.button)}
            </Button>
          </Form>
        </Grid.Column>
      </Grid>
    </Container>
  );
}


export default Login;