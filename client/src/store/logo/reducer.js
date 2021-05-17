import { LOAD_LOGO, LOGO_LOADING, UPDATE_LOGO } from "./actionTypes";

const initialState = {
  isLoading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_LOGO:
      return { ...state, ...action.payload };
    case LOGO_LOADING:
      return { ...state, isLoading: action.payload };
    case UPDATE_LOGO:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default reducer;
