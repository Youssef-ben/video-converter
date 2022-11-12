
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import type { InputOnChangeData } from "semantic-ui-react";
import { Button, Container, Form, Grid, Message } from "semantic-ui-react";

import useLogin from "common/store/hooks/useLogin";
import AppLogo from "components/AppLogo";
import APP_ROUTES from "navigation/navigation-constants";

function Login() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const text = {
    placeholder: 'app.login.placeholder.password',
    button: 'app.login.btn',
  }
  const { login, connectUser, onPasswordChange } = useLogin();

  const onChangeHandler = (_: React.ChangeEvent<HTMLInputElement>, { value }: InputOnChangeData) => {
    onPasswordChange(value)
  }

  const onClickHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const result = await connectUser();
    if (result) {
      navigate(APP_ROUTES.PRIV_HOME)
    }
  }

  return (
    <Container>
      <Grid className="login-page">
        <Grid.Column textAlign="center">
          <AppLogo />

          <Form size="large">
            {login?.error &&
              <Message size="small" negative className="app-error">
                <p>{login.error.content}</p>
              </Message>
            }
            <Form.Input
              fluid
              icon="lock"
              type="password"
              iconPosition="left"
              value={login.value}
              error={!!login?.error}
              placeholder={t(text.placeholder)}
              onChange={onChangeHandler}
            />

            <Button loading={login.loading} disabled={login.loading} primary fluid size="large" onClick={onClickHandler}>
              {t(text.button)}
            </Button>
          </Form>
        </Grid.Column>
      </Grid>
    </Container>
  );
}


export default Login;