import axios from "axios";
import { confirmFeedbackFormAction, hideFeedbackFormAction } from "./actions";
import { toastr } from "react-redux-toastr";

export const postFeedback = (feedbackObj) => async (dispatch) => {
  const response = await axios
    .post("/api/feedbacks", feedbackObj)
    .catch((err) => {
      toastr.error(err.response.data.message);
      dispatch(hideFeedbackFormAction);
    });
  if (response) {
    dispatch(confirmFeedbackFormAction);
  }
};
