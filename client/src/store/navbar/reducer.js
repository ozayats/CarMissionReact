import { LOAD_NAVBAR, NAVBAR_LOADING, ADD_NEW_ITEM, UPDATE_ITEM } from "./actionTypes";

const initialState = {
  data: [],
  isLoading: true,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_NAVBAR:
      return { ...state, data: action.payload };
    case NAVBAR_LOADING:
      return { ...state, isLoading: action.payload };
    case ADD_NEW_ITEM:
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    case UPDATE_ITEM:
      return {...state, data: action.payload,};
    default:
      return state;
  }
};

export default reducer;
