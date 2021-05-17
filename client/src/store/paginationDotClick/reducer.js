import {
  RESET_DOT_CLICK,
  RESET_TARGET_SECTION,
  SET_DOT_CLICK,
  SET_TARGET_SECTION,
} from "./actionTypes";

const initialSate = {
  click: false,
  targetSection: "",
};

const reducer = (state = initialSate, action) => {
  switch (action.type) {
    case SET_TARGET_SECTION:
      return {
        ...state,
        targetSection: action.payload,
      };
    case RESET_TARGET_SECTION:
      return {
        ...state,
        targetSection: action.payload,
      };
    case SET_DOT_CLICK:
      return {
        ...state,
        click: action.payload,
      };
    case RESET_DOT_CLICK:
      return {
        ...state,
        click: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
