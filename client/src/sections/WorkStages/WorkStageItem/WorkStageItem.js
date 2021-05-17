import React from "react";
import Gear from "../SVG/Gear/Gear";
import WorkStageName from "../WorkStageName/WorkStageName";
import Arrow from "../SVG/Arrow/Arrow";
import Image from "../../../components/Image/Image";
import PropTypes from "prop-types";

const WorkStageItem = ({ stageNum, stageName, stageLength, src }) => {
  const even = stageNum % 2 === 0;

  return (
    <div className="work-stages__item">
      {even && (
        <WorkStageName
          stageName={stageName}
          classModifier="work-stages__item-name--even"
        />
      )}
      <div className="work-stages__graphics-wrapper">
        <Gear />
        <Image src={src} alt="stage icon" className="work-stages__icon" />
        {stageNum < stageLength && (
          <Arrow className="work-stages__icon-arrow" />
        )}
        <span
          className={
            even
              ? "work-stages__stage-number work-stages__stage-number--even"
              : "work-stages__stage-number work-stages__stage-number--odd"
          }
        >
          {stageNum < 10 ? `0${stageNum}` : stageNum}
        </span>
      </div>
      {!even && (
        <WorkStageName
          stageName={stageName}
          classModifier="work-stages__item-name--odd"
        />
      )}
    </div>
  );
};

WorkStageItem.propTypes = {
  stageNum: PropTypes.number,
  stageName: PropTypes.string,
  stageLength: PropTypes.number,
  src: PropTypes.string,
};

export default WorkStageItem;
