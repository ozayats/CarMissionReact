import {
  IS_LOADING_SECTIONS,
  LOAD_SECTIONS,
  UPDATE_SECTION,
} from "./actionTypes";

export const setMainSections = (sectionsArr) => ({
  type: LOAD_SECTIONS,
  payload: sectionsArr,
});

export const setIsLoading = (isLoading) => ({
  type: IS_LOADING_SECTIONS,
  payload: isLoading,
});

export const updateMainSections = (newSection) => ({
  type: UPDATE_SECTION,
  payload: newSection,
});
