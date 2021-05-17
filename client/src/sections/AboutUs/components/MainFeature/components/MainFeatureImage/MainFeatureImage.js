import React from "react";
import Image from "../../../../../../components/Image/Image";

const MainFeatureImage = ({ imgPath }) => {
  return (
    <div className="about-us__main-feature-image-box">
      <Image
        className="about-us__main-feature-image"
        src={imgPath}
        alt="staff-photo"
      />
    </div>
  );
};

export default MainFeatureImage;
