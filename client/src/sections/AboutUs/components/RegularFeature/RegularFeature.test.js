import React from "react";
import { render } from "@testing-library/react";
import RegularFeature from "./RegularFeature";
import Image from "../../../../components/Image/Image";

const mockComponentClassName = "about-us__feature-box";
const mockComponentImgPath = "/path/img/file.png";
const mockComponentTitle = "Component TestTitle";

test("RegularFeature is rendered correctly", () => {
  render(<RegularFeature className={mockComponentClassName} />);
});

test("RegularFeature contains image and text", () => {
  const { getByTestId } = render(
    <RegularFeature className={mockComponentClassName}>
      <Image src={mockComponentImgPath} alt="feature-icon" />
      <p>{mockComponentTitle}</p>
    </RegularFeature>
  );
  const featureTitle = getByTestId("regularFeature-title");
  expect(featureTitle).toBeDefined();
});
