import React from "react";
import PropTypes from "prop-types";

const WorkStageName = ({ stageName, classModifier }) => {
  return (
    <span className={`work-stages__item-name ${classModifier}`}>
      {stageName}
    </span>
  );
};

WorkStageName.propTypes = {
  stageName: PropTypes.string,
  classModifier: PropTypes.string,
};

export default WorkStageName;
