import React from "react";
import { useDispatch } from "react-redux";
import { hideFeedbackFormAction } from "../../../store/FeedbackForm/actions";
import Button from "../../generalComponents/Button/Button";

const FeedbackConfirmationWindow = () => {
  const dispatch = useDispatch();

  return (
    <div className="feedback-form__wrapper"  onClick={(event) => {if (event.target===event.currentTarget) {dispatch(hideFeedbackFormAction)}}}>
    <div className="feedback-form feedback-form__conf">
      <Button
        className="feedback-form__exit-btn"
        onClick={() => {
          dispatch(hideFeedbackFormAction);
        }}
        text="&#215;"
      />
      <p className="feedback-form__conf-text1">Спасибо :)</p>
      <p className="feedback-form__conf-text2">
        {" "}
        Мы свяжемся с вами в течении 5 минут !
      </p>
    </div>
    </div>
  );
};

export default FeedbackConfirmationWindow;
