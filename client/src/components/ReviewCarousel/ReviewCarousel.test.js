import React from "react";
import { render } from "@testing-library/react";
import ReviewCarousel from "./ReviewCarousel";
import { mockAllIsIntersecting } from "react-intersection-observer/test-utils";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";

const mockStore = configureStore();
const store = mockStore({
  paginationDotClick: { click: false, targetSection: "" },
  reviewCarousel: { reviews: [] },
});

jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    replace: jest.fn(),
  }),
}));

test("ReviewCarousel is rendered is correctly", () => {
  const mockDispatch = jest.fn();
  const mockSelector = jest.fn();
  jest.mock("react-redux", () => ({
    useDispatch: () => mockDispatch,
    useSelector: () => mockSelector,
  }));

  render(
    <Provider store={store}>
      <ReviewCarousel heading="test" />
    </Provider>
  );
  mockAllIsIntersecting(true);
});
