import React from "react";
import { render } from "@testing-library/react";
import ReviewItem from "./ReviewItem";

const mockNameReviewer = "nameReviewer";
const mockNameCar = "nameCar";
const mockReview = "some review text";

test("ReviewItem is rendered is correctly", () => {
  render(
    <ReviewItem
      nameReviewer={mockNameReviewer}
      nameCar={mockNameCar}
      review={mockReview}
    />
  );
});

test("review contains text", () => {
  const { getByTestId, getByText } = render(
    <ReviewItem
      nameReviewer={mockNameReviewer}
      nameCar={mockNameCar}
      review={mockReview}
    />
  );
  const reviewText = getByTestId("review-text");

  expect(getByText("some review text")).toBeInTheDocument();
  expect(reviewText).toBeDefined();
});
