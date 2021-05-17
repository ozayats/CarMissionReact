import React, { memo } from "react";
import "./WorkStages.scss";
import WorkStagesList from "../WorkStagesList/WorkStagesList";
import Button from "../../../components/generalComponents/Button/Button";
import SectionHeading from "../../../components/generalComponents/SectionHeading/SectionHeading";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { showFeedbackFormAction } from "../../../store/FeedbackForm/actions";
import useLiveHashPush from "../../../utils/hooks/useLiveHashPush";

const WorkStages = ({ description, heading, anchorName }) => {
  const dispatch = useDispatch();
  const trackRef = useLiveHashPush(anchorName);

  const showFeedbackModal = () => {
    dispatch(showFeedbackFormAction);
  };

  return (
    <section id={anchorName} className="work-stages" ref={trackRef}>
      <div className="work-stages__content">
        <SectionHeading text={heading} className="work-stages__head" />
        <div className="work-stages__items-wrapper">
          <WorkStagesList />
        </div>
        <p className="work-stages__description">{description}</p>
        <Button
          text="Обратный звонок"
          className="button-callback-bigger"
          onClick={showFeedbackModal}
        />
      </div>
    </section>
  );
};

WorkStages.propTypes = {
  description: PropTypes.string,
  heading: PropTypes.string,
  anchorName: PropTypes.string,
};

export default memo(WorkStages);
