import {
  LOADING_FEATURES,
  TOGGLE_IS_LOADING_FEATURES,
  ADD_NEW_FEATURE,
  UPDATE_FEATURE,
} from "./actionTypes";

export const setFeatures = (featuresArr) => ({
  type: LOADING_FEATURES,
  payload: featuresArr,
});

export const featuresIsLoading = (isLoading) => ({
  type: TOGGLE_IS_LOADING_FEATURES,
  payload: isLoading,
});

export const addNewFeature = (newFeature) => ({
  type: ADD_NEW_FEATURE,
  payload: newFeature,
});

export const updateFeatures = (newFeatures) => ({
  type: UPDATE_FEATURE,
  payload: newFeatures,
});
