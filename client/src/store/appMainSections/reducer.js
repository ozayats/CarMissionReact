import {
  LOAD_SECTIONS,
  IS_LOADING_SECTIONS,
  UPDATE_SECTION,
} from "./actionTypes";

const initialState = {
  sections: [],
  isLoading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SECTIONS:
      return {
        ...state,
        sections: action.payload,
      };
    case IS_LOADING_SECTIONS:
      return {
        ...state,
        isLoading: action.payload,
      };
    case UPDATE_SECTION:
      return {
        ...state,
        sections: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
