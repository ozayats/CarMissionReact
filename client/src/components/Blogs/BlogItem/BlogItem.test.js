import React from "react";
import { fireEvent, render } from "@testing-library/react";
import BlogItem from "./BlogItem";
import { BrowserRouter } from "react-router-dom";

const mockSrc = "src";
const mockTitle = "title";
const mockText = "some blog text";
const mockButtonText = "buttonText";
const mockDate = "date";
const btnClickMock = jest.fn();
const mockId = "123"

test("BlogItem is rendered is correctly", () => {
  render(
    <BrowserRouter>
      <BlogItem
        src={mockSrc}
        title={mockTitle}
        text={mockText}
        linkText={mockButtonText}
        date={mockDate}
        onClick={btnClickMock}
        id={mockId}
      />
    </BrowserRouter>
  );
});

test("BlogItem contains text", () => {
  const { getByTestId, getByText } = render(
    <BrowserRouter>
      <BlogItem
        src={mockSrc}
        title={mockTitle}
        text={mockText}
        linkText={mockButtonText}
        date={mockDate}
        onClick={btnClickMock}
        id={mockId}
      />
    </BrowserRouter>
  );
  const blogText = getByTestId("blog-item__text");

  expect(getByText("some blog text")).toBeInTheDocument();
  expect(blogText).toBeDefined();
});

test("Function onClick is called when was clicked on button", () => {
 const { getByTestId } = render(
   <BrowserRouter>
    <BlogItem
      src={mockSrc}
      title={mockTitle}
      text={mockText}
      linkText={mockButtonText}
      date={mockDate}
      onClick={btnClickMock}
      id={mockId}
    />
   </BrowserRouter>
  );
  const link = getByTestId("link");
  expect(btnClickMock).not.toHaveBeenCalled();
  fireEvent.click(link);
});

