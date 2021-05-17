import React from "react";
import { render } from "@testing-library/react";
import MainFeature from "./MainFeature";

const mockComponentClassName = "about-us__content-box";
const mockSubComponentClassName = "about-us__content-box-text";
const mockComponentText =
  "First sentence./Second sentence.Third sentence./Fourth sentence.";
const splittedText = mockComponentText.split("/");

test("MainFeature is rendered correctly", () => {
  render(
    <MainFeature className={mockComponentClassName} text={mockComponentText}>
      <div className={mockSubComponentClassName}>
        <p>{splittedText[0]}</p>
        <p>{splittedText[1]}</p>
        <p>{splittedText[2]}</p>
      </div>
    </MainFeature>
  );
});
