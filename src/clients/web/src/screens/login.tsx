import { useTranslation } from "react-i18next";
import { Button, Container, Form, Grid } from "semantic-ui-react";

import AppLogo from "components/app_logo";

function Login() {
  const { t } = useTranslation();
  const text = {
    placeholder: 'app.login.placeholder.password',
    button: 'app.login.btn',
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