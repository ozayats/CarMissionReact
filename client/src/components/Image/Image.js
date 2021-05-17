import React from "react";
import PropTypes from "prop-types";
import "./Image.scss";

const Image = ({ className, src, id, alt }) => {
  return <img src={src} alt={alt} id={id} className={className} data-testid="image"/>;
};

Image.propTypes = {
  className: PropTypes.string,
  src: PropTypes.string,
  id: PropTypes.string,
  alt: PropTypes.string,
};

Image.defaultProps = {
  className: "",
  src: "",
  id: "",
  alt: "noname-img",
};

export default Image;
