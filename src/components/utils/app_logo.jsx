import React from 'react';
import PropTypes from 'prop-types';

const AppLogo = (props) => {
  const { alt, logo, width, height } = props;

  return <img alt={alt} src={logo} width={width} height={height} />;
};

AppLogo.defaultProps = {
  alt: 'Video Converter',
  width: 32,
  height: 32,
};

AppLogo.propTypes = {
  alt: PropTypes.string,
  logo: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};

export default AppLogo;
