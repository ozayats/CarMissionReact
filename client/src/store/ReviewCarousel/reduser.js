import {
  LOADING_REVIEWS,
  TOGGLE_IS_LOADING_REVIEWS,
  ADD_NEW_REVIEW,
  UPDATE_REVIEW,
} from "./actionTypes";

const initialState = {
  reviews: [],
  isLoading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_REVIEWS:
      return {
        ...state,
        reviews: action.payload,
      };
    case TOGGLE_IS_LOADING_REVIEWS:
      return {
        ...state,
        isLoading: action.payload,
      };
    case ADD_NEW_REVIEW:
      return {
        ...state,
        reviews: [...state.reviews, action.payload],
      };
    case UPDATE_REVIEW:
      return {
        ...state,
        reviews: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
