import React, { memo } from "react";
import "./AboutUs.scss";
import RegularFeature from "./components/RegularFeature/RegularFeature";
import MainFeature from "./components/MainFeature/MainFeature";
import SectionHeading from "../../components/generalComponents/SectionHeading/SectionHeading";
import { useSelector } from "react-redux";
import {
  getFeatures,
  getFeaturesIsLoading,
} from "../../store/aboutUs/selectors";
import Loader from "../../components/Loader/Loader";
import useLiveHashPush from "../../utils/hooks/useLiveHashPush";
import PropTypes from "prop-types";

const AboutUs = ({ heading, anchorName }) => {
  const featuresList = useSelector(getFeatures);
  const isLoading = useSelector(getFeaturesIsLoading);
  const ref = useLiveHashPush(anchorName);

  const featuresRender = () => {
    const regularFeaturesArr = featuresList.filter((f) => !f.isMain);
    const mainFeatureArr = featuresList.filter((f) => f.isMain);

    const regularFeaturesToRender = regularFeaturesArr.map((regularFeature) => {
      const { imgPath, title, _id: id } = regularFeature;
      return (
        <RegularFeature
          className="about-us__feature-box"
          imgPath={imgPath}
          title={title}
          key={id}
        />
      );
    });

    const mainFeatureToRender = mainFeatureArr.map((mainFeature) => {
      const { imgPath, title, text, _id: id } = mainFeature;
      return (
        <MainFeature
          className="about-us__main-feature-box"
          imgPath={imgPath}
          title={title}
          text={text}
          key={id}
        />
      );
    });

    return (
      <>
        <div className="about-us__features-box">{regularFeaturesToRender}</div>
        {mainFeatureToRender}
      </>
    );
  };

  return (
    <section className="about-us__container" id={anchorName} ref={ref}>
      <SectionHeading className="about-us__heading" text={heading} />
      {isLoading || !featuresList.length ? (
        <Loader className="about-us__loader" />
      ) : (
        featuresRender(featuresList)
      )}
    </section>
  );
};

AboutUs.propTypes = {
  description: PropTypes.string,
  heading: PropTypes.string,
  anchorName: PropTypes.string,
};

export default memo(AboutUs);
