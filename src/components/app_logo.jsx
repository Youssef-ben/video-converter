import React from "react"

const AppLogo = (props) => {
  return (
    <img
      alt={props.alt}
      src={props.logo}
      width={props.width}
      height={props.height}
    />
  );
};

AppLogo.defaultProps = { 
    alt: "Video Converter",
    width: 32,
    height: 32
};

export default AppLogo;