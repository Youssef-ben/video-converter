import React from 'react';
import PropTypes from 'prop-types';

const ImageView = (props) => {
  const { alt, logo, width, height } = props;

  return <img alt={alt} src={logo} width={width} height={height} />;
};

ImageView.defaultProps = {
  alt: 'Video Converter',
  width: 32,
  height: 32,
};

ImageView.propTypes = {
  alt: PropTypes.string,
  logo: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};

export default ImageView;
