import React from "react";
import PropTypes from "prop-types";
import "./Button.scss";

export const Button = ({ text, onClick, className }) => {
  return (
    <button data-testid="btn" className={className} onClick={onClick}>
      {text}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
};

export default Button;
