import {
  CONFIRM_FEEDBACK_FORM,
  HIDE_FEEDBACK_FORM,
  SHOW_FEEDBACK_FORM,
} from "./actionTypes";

export const confirmFeedbackFormAction = {
  type: CONFIRM_FEEDBACK_FORM,
  payload: {
    selfState: "confirm",
  },
};

export const hideFeedbackFormAction = {
  type: HIDE_FEEDBACK_FORM,
  payload: {
    selfState: "closed",
  },
};

export const showFeedbackFormAction = {
  type: SHOW_FEEDBACK_FORM,
  payload: {
    selfState: "open",
  },
};
