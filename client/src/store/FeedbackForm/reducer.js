import {
  SHOW_FEEDBACK_FORM,
  HIDE_FEEDBACK_FORM,
  CONFIRM_FEEDBACK_FORM,
} from "./actionTypes";

const initialStore = {
  selfState: "closed",
};

const reducer = (store = initialStore, { type, payload }) => {
  switch (type) {
    case SHOW_FEEDBACK_FORM:
      return payload;

    case HIDE_FEEDBACK_FORM:
      return payload;

    case CONFIRM_FEEDBACK_FORM:
      return payload;

    default:
      return store;
  }
};

export default reducer;
