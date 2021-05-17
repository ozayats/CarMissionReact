import React from "react";
import PropTypes from "prop-types";
import "./Logo.scss";

const Logo = ({ className, src, id, alt }) => {
  return <img src={src} alt={alt} id={id} className={className} data-testid="main-logo"/>;
};

Logo.propTypes = {
  className: PropTypes.string,
  src: PropTypes.string,
  id: PropTypes.string,
  alt: PropTypes.string,
};

Logo.defaultProps = {
  className: "",
  src: "",
  id: "",
  alt: "logo-img",
};

export default Logo;
