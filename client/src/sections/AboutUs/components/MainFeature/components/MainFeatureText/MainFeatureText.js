import React from "react";
import "./MainFeatureText.scss";
import { v4 as uuidv4 } from "uuid";

const MainFeatureText = ({ text }) => {
  const textContent = text.split("br&gt;");

  return (
    <div className="about-us__main-feature-text-box">
      {textContent.map((string) => {
        return (
          <p className="about-us__main-feature-text" key={uuidv4()}>
            {string}
          </p>
        );
      })}
    </div>
  );
};

export default MainFeatureText;
