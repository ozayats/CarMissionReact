import React from "react";
import PropTypes from "prop-types";
import { quotes } from "./quotes.jsx";
import "./ReviewItem.scss";
import Image from "../../Image/Image";

const ReviewItem = ({ src, nameReviewer, nameCar, review }) => {
  return (
    <div className="review__wrapper">
      <Image className="review__img" src={src} alt="photo" />
      <div className="review__info">
        <p className="review__name-reviewer">{nameReviewer}</p>
        <p className="review__name-car">{nameCar}</p>
        <span className="review__quotes">{quotes()}</span>
        <p data-testid="review-text" className="review__review">
          {review}
        </p>
      </div>
    </div>
  );
};
ReviewItem.propTypes = {
  nameReviewer: PropTypes.string.isRequired,
  nameCar: PropTypes.string.isRequired,
  review: PropTypes.string.isRequired,
};

export default ReviewItem;
