import {
  ADD_NEW_STAGE,
  LOADING_STAGES,
  UPDATE_STAGE,
  SET_IS_LOADING_STAGES,
} from "./actionTypes";

const initialState = {
  stages: [],
  isLoading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_STAGES:
      return {
        ...state,
        stages: action.payload,
      };
    case SET_IS_LOADING_STAGES:
      return {
        ...state,
        isLoading: action.payload,
      };
    case ADD_NEW_STAGE:
      return {
        ...state,
        stages: [...state.stages, action.payload],
      };
    case UPDATE_STAGE:
      return {
        ...state,
        stages: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
