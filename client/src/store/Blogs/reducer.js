import { LOADING_BLOGS, TOGGLE_IS_LOADING_BLOGS, ADD_NEW_BLOG, UPDATE_BLOG } from "./actionTypes";

const initialState = {
  blogs: [],
  isLoading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_BLOGS:
      return {
        ...state,
        blogs: action.payload,
      };
    case TOGGLE_IS_LOADING_BLOGS:
      return {
        ...state,
        isLoading: action.payload,
      };
    case ADD_NEW_BLOG:
      return {
        ...state,
        blogs: [...state.blogs, action.payload],
      };
    case UPDATE_BLOG:
      return {
        ...state,
        blogs: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
