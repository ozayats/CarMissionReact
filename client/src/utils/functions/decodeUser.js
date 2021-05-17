import jwtDecode from "jwt-decode";

export const decodeUser = (token) => {
  if (token) {
    return jwtDecode(token);
  } else {
    const tokenLocal = localStorage.getItem("token");
    if (tokenLocal) {
      return { decoded: jwtDecode(tokenLocal), token: tokenLocal };
    } else {
      return {};
    }
  }
};
