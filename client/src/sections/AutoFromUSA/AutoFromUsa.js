import React, { memo } from "react";
import "./AutoFromUSA.scss";
import Button from "../../components/generalComponents/Button/Button";
import { useDispatch } from "react-redux";
import { showFeedbackFormAction } from "../../store/FeedbackForm/actions";
import SocialNetworks from "../../components/SocialNetworks/SocialNetworks";
import useLiveHashPush from "../../utils/hooks/useLiveHashPush";
import PropTypes from "prop-types";

const AutoFromUsa = ({ heading, description, anchorName }) => {
  const dispatch = useDispatch();
  const ref = useLiveHashPush(anchorName);

  return (
    <section className="auto-from-usa__container" id={anchorName} ref={ref}>
      <div className="auto-from-usa__wrapper">
        <h1 className="auto-from-usa__heading">{heading}</h1>
        <p className="auto-from-usa__description">{description}</p>
        <Button
          className="button-choose-car"
          text="Подобрать авто"
          onClick={() => {
            dispatch(showFeedbackFormAction);
          }}
        />
        <SocialNetworks className="header__networks" />
      </div>
    </section>
  );
};

AutoFromUsa.propTypes = {
  description: PropTypes.string,
  heading: PropTypes.string,
  anchorName: PropTypes.string,
};

export default memo(AutoFromUsa);
