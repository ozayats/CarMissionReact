import { SET_IS_AUTH } from "./actionTypes";

export const setIsAuth = (value) => ({
  type: SET_IS_AUTH,
  payload: value,
});
