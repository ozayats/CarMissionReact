import React from "react";
import { render } from "@testing-library/react";
import Logo from "./Logo";

test("Logo have default alt", () => {
  const { getByTestId } = render(<Logo />);
  const logo = getByTestId("main-logo");
  expect(logo.alt).toBe("logo-img");
})

test("Logo have correct class-name", () => {
  const { getByTestId } = render(<Logo className="test-logo"/>);
  const logo = getByTestId("main-logo");
  expect(logo.className).toBe("test-logo");
})