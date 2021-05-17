import React from "react";
import { render } from "@testing-library/react";
import Image from "./Image";

test("Image have default alt", () => {
  const { getByTestId } = render(<Image />);
  const image = getByTestId("image");
  expect(image.alt).toBe("noname-img");
})

test("Image have correct class-name", () => {
  const { getByTestId } = render(<Image className="test-image"/>);
  const image = getByTestId("image");
  expect(image.className).toBe("test-image");
})