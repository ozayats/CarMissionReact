import { LOAD_LOGO, LOGO_LOADING, UPDATE_LOGO } from "./actionTypes";

export const setLogoData = (data) => ({
  type: LOAD_LOGO,
  payload: data,
});

export const logoDataLoading = (isLoading) => ({
  type: LOGO_LOADING,
  payload: isLoading,
});

export const updateLogoData = (newData) => ({
  type: UPDATE_LOGO,
  payload: newData,
});
