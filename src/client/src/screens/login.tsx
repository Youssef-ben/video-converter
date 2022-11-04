import React from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate } from 'react-router-dom';
import { Button, Container, Form, Grid, Header, Image } from 'semantic-ui-react';
import Logo from '../assets/images/logo.png';
import useLoginHook from '../hooks/login_page/use_login_hook';
import APP_ROUTES from '../routes/routes.constants';

function LoginPage(): JSX.Element {
  const { t } = useTranslation();
  const hookData = useLoginHook();

  if (hookData.hasAuthToken) {
    return <Navigate to={APP_ROUTES.PRIV_YTD} />;
  }

  return (
    <Container>
      <Grid className="login-page">
        <Grid.Column textAlign="center">
          <Header as="h2" color="teal" textAlign="center">
            <Image className="app-logo" src={Logo} />
          </Header>
          <Form size="large">
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder={t('app.login.password')}
              type="password"
              value={hookData.password}
              onChange={hookData.onPasswordChange}
              error={hookData.error}
            />

            <Button primary fluid size="large" onClick={hookData.onLogin}>
              {t('btn.login')}
            </Button>
          </Form>
        </Grid.Column>
      </Grid>
    </Container>
  );
}

export default LoginPage;
