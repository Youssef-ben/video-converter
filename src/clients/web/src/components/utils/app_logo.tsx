import React from 'react';

import { Image } from 'semantic-ui-react';
import Logo from '../../assets/images/logo.png';

interface AppLogoProps {
  forHeader?: boolean;
}

function AppLogo({ forHeader = false }: AppLogoProps): JSX.Element {
  return <Image className={`app-logo ${!forHeader && 'home-logo'}`} src={Logo} size={forHeader ? 'mini' : 'medium'} />;
}

export default AppLogo;
