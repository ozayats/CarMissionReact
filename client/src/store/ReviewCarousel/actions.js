import {
  LOADING_REVIEWS,
  TOGGLE_IS_LOADING_REVIEWS,
  ADD_NEW_REVIEW,
  UPDATE_REVIEW,
} from "./actionTypes";

export const setReviews = (reviewsArr) => ({
  type: LOADING_REVIEWS,
  payload: reviewsArr,
});

export const ReviewsIsLoading = (isLoading) => ({
  type: TOGGLE_IS_LOADING_REVIEWS,
  payload: isLoading,
});
export const addNewReview = (newReview) => ({
  type: ADD_NEW_REVIEW,
  payload: newReview,
});
export const updateReviews = (reviewsArr) => ({
  type: UPDATE_REVIEW,
  payload: reviewsArr,
});
