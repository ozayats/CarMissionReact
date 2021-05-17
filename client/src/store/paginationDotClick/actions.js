import {
  RESET_DOT_CLICK,
  RESET_TARGET_SECTION,
  SET_DOT_CLICK,
  SET_TARGET_SECTION,
} from "./actionTypes";

export const setTargetSection = (sectionAnchor) => ({
  type: SET_TARGET_SECTION,
  payload: sectionAnchor,
});

export const resetTargetSection = () => ({
  type: RESET_TARGET_SECTION,
  payload: "",
});

export const setDotClick = () => ({
  type: SET_DOT_CLICK,
  payload: true,
});

export const resetDotClick = () => ({
  type: RESET_DOT_CLICK,
  payload: false,
});
