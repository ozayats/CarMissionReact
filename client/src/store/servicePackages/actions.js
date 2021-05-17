import {
  LOADING_PACKAGES,
  TOGGLE_IS_LOADING_PACKAGES,
  ADD_PACKAGES,
  UPDATE_PACKAGES,
} from "./actionTypes";

export const setPackages = (packagesArr) => ({
  type: LOADING_PACKAGES,
  payload: packagesArr,
});

export const addPackages = (packagesArr) => ({
  type: ADD_PACKAGES,
  payload: packagesArr,
});

export const packagesIsLoading = (isLoading) => ({
  type: TOGGLE_IS_LOADING_PACKAGES,
  payload: isLoading,
});

export const updatePackages = (packageArr) => ({
  type: UPDATE_PACKAGES,
  payload: packageArr,
});
