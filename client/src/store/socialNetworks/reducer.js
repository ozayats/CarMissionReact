import { LOAD_SOCIAL_NETWORKS, ADD_NEW_SOCIAL_NETWORKS, UPDATE_SOCIAL_NETWORKS, SOCIAL_NETWORKS_LOADING } from "./actionTypes";

const initialState = {
  data: [],
  isLoading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SOCIAL_NETWORKS:
      return { ...state, data: action.payload };
    case ADD_NEW_SOCIAL_NETWORKS:
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    case UPDATE_SOCIAL_NETWORKS:
      return {...state, data: action.payload,};
    case SOCIAL_NETWORKS_LOADING:
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

export default reducer;
