import { setIsAuth } from "./actions";
import axios from "axios";
import { decodeUser } from "../../utils/functions/decodeUser";

export const checkToken = () => (dispatch) => {
  const { decoded, token } = decodeUser();
  if (decoded && token) {
    if (decoded.exp * 1000 > Date.now() && decoded.isAdmin) {
      axios.defaults.headers.common.Authorization = token;
      dispatch(setIsAuth(true));
    } else {
      dispatch(setIsAuth(false));
      localStorage.removeItem("token");
    }
  } else {
    dispatch(setIsAuth(false));
  }
};
