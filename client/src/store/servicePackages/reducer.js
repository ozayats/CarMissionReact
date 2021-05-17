import {
  LOADING_PACKAGES,
  ADD_PACKAGES,
  UPDATE_PACKAGES,
  TOGGLE_IS_LOADING_PACKAGES,
} from "./actionTypes";

const initialState = {
  packages: [],
  isLoading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_PACKAGES:
      return {
        ...state,
        packages: action.payload,
      };
    case TOGGLE_IS_LOADING_PACKAGES:
      return {
        ...state,
        isLoading: action.payload,
      };
    case ADD_PACKAGES:
      return {
        ...state,
        packages: [...state.packages, action.payload],
      };
    case UPDATE_PACKAGES:
      return {
        ...state,
        packages: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
