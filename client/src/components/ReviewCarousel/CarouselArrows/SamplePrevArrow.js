import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../ReviewCarousel.scss";
import PropTypes from "prop-types";

const SamplePrevArrow = ({ onClick }) => {
  return <div className="arrow__prev" onClick={onClick} />;
};

SamplePrevArrow.propTypes = {
  onclick: PropTypes.func,
};

export default SamplePrevArrow;
