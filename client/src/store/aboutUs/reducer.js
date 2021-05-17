import {
  ADD_NEW_FEATURE,
  LOADING_FEATURES,
  TOGGLE_IS_LOADING_FEATURES,
  UPDATE_FEATURE,
} from "./actionTypes";

const initialState = {
  features: [],
  isLoading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_FEATURES:
      return {
        ...state,
        features: action.payload,
      };
    case TOGGLE_IS_LOADING_FEATURES:
      return {
        ...state,
        isLoading: action.payload,
      };
    case ADD_NEW_FEATURE:
      return {
        ...state,
        features: [...state.features, action.payload],
      };
    case UPDATE_FEATURE:
      return {
        ...state,
        features: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
