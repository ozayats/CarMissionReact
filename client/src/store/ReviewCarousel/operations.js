import { setReviews, ReviewsIsLoading, updateReviews } from "./actions";
import axios from "axios";
import { getReviews } from "./selectors";
import { toastr } from "react-redux-toastr";

export const loadReviews = () => (dispatch) => {
  dispatch(ReviewsIsLoading(true));

  axios("/api/reviews/")
    .then((res) => {
      dispatch(setReviews(res.data));
      dispatch(ReviewsIsLoading(false));
    })
    .catch((err) => {
      toastr.error(err.response.data.message);
    });
};

export const filterReviews = (id) => (dispatch, getStore) => {
  const reviews = getReviews(getStore());

  const filtered = reviews.filter((review) => review._id !== id);
  dispatch(updateReviews(filtered));
};

export const updateReviewByNewSrc = (src, id) => (dispatch, getStore) => {
  const reviews = getReviews(getStore());

  const updated = reviews.map((review) => {
    if (review._id === id) {
      return {
        ...review,
        customerPhoto: src,
      };
    } else {
      return review;
    }
  });

  dispatch(updateReviews(updated));
};

export const updateReviewByNewObject = (newReview) => (dispatch, getStore) => {
  const reviews = getReviews(getStore());

  const updated = reviews.map((review) => {
    if (review._id === newReview._id) {
      return newReview;
    } else {
      return review;
    }
  });

  dispatch(updateReviews(updated));
};
