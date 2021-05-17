import { SET_IS_AUTH } from "./actionTypes";

const initialState = {
  isAuth: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_AUTH:
      return {
        isAuth: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
