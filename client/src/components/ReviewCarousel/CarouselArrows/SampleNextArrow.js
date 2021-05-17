import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../ReviewCarousel.scss";
import PropTypes from "prop-types";

const SampleNextArrow = ({ onClick }) => {
  return <div className="arrow__next" onClick={onClick} />;
};

SampleNextArrow.propTypes = {
  onClick: PropTypes.func,
};

export default SampleNextArrow;
