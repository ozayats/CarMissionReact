import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { Button } from "./Button";

const mockText = "button";

test("Button is rendered is correctly", () => {
  render(<Button text={mockText} />);
});

test("Function onClick is called when was clicked on button", () => {
  const btnClickMock = jest.fn();
  const { getByTestId } = render(
    <Button text={mockText} onClick={btnClickMock} />
  );
  const btn = getByTestId("btn");
  expect(btnClickMock).not.toHaveBeenCalled();
  fireEvent.click(btn);
  expect(btnClickMock).toHaveBeenCalledTimes(1);
});

test("Simple Button snapshot", () => {
  const { container } = render(<Button text={mockText} />);

  expect(container.firstChild).toMatchInlineSnapshot(`
    <button
      data-testid="btn"
    >
      button
    </button>
  `);
});
