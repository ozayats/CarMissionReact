import React from "react";
import { render } from "@testing-library/react";
import Loader from "./Loader";

test("Loader have default class-name", () => {
  const { getByTestId } = render(<Loader />);
  const loader = getByTestId("loader");
  expect(loader.className).toBe("loader-window");
});

test("Loader have correct class-name", () => {
  const { getByTestId } = render(<Loader className="test-loader" />);
  const loader = getByTestId("loader");
  expect(loader.className).toBe("test-loader");
});
