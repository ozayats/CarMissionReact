import React from "react";
import "./FeedbackForm.scss";
import { useSelector } from "react-redux";
import { feedbackFormState } from "../../../store/FeedbackForm/selectors";
import FeedbackConfirmationWindow from "../FeedbackFormConfirmationWindow/FeedbackConfirmationWindow";
import FeedbackFormElement from "../FeedbackFormElement/FeedbackFormElement";

const FeedbackForm = () => {
  const isFeedbackFormOpen = useSelector(feedbackFormState);

  return isFeedbackFormOpen === "open" ? (
    <FeedbackFormElement />
  ) : isFeedbackFormOpen === "confirm" ? (
    <FeedbackConfirmationWindow />
  ) : null;
};

export default FeedbackForm;
