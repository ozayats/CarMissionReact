import React, { memo } from "react";
import "./MainFeature.scss";
import useWinSize from "../../../../utils/hooks/useWinSize";
import PropTypes from "prop-types";
import MainFeatureImage from "./components/MainFeatureImage/MainFeatureImage";
import MainFeatureText from "./components/MainFeatureText/MainFeatureText";

const MainFeature = (props) => {
  const { className, imgPath, text } = props;
  const { width: winWidth } = useWinSize();

  const mainFeatureRender = (windowWidth) => {
    if (windowWidth <= 640) {
      return (
        <div className={className}>
          <MainFeatureText text={text} />
        </div>
      );
    } else if (windowWidth > 640) {
      return (
        <div className={className}>
          <MainFeatureImage imgPath={imgPath} />
          <MainFeatureText text={text} />
        </div>
      );
    }
  };

  return <>{mainFeatureRender(winWidth)}</>;
};

MainFeature.propTypes = {
  className: PropTypes.string.isRequired,
  altText: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

MainFeature.defaultProps = {
  altText: "featureImage",
};

export default memo(MainFeature);
