import React from "react";
import { render } from "@testing-library/react";
import FilterFieldTitle from "./FilterFieldTitle";

const mockText = "Title";

test("FilterFieldTitle is rendered is correctly", () => {
  render(<FilterFieldTitle text={mockText} />);
});
test("Simple FilterFieldTitle snapshot", () => {
  const { container } = render(<FilterFieldTitle text={mockText} />);

  expect(container.firstChild).toMatchInlineSnapshot(`
    <h4
      class="filter__field-title"
      data-testid="filter-field-title"
    >
      Title
    </h4>
  `);
});

test("FilterFieldTitle contains text", () => {
  const { getByTestId, getByText } = render(
    <FilterFieldTitle text={mockText} />
  );
  const title = getByTestId("filter-field-title");

  expect(getByText("Title")).toBeInTheDocument();
  expect(title).toBeDefined();
});
