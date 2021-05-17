import React from "react";
import { render } from "@testing-library/react";
import AutoFromUsa from "./AutoFromUsa";
import Button from "../../components/generalComponents/Button/Button";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { mockAllIsIntersecting } from "react-intersection-observer/test-utils";

const mockHeadingText = "Test heading";
const mockSectionClassName = "auto-from-usa__container";
const mockSectionDescription = "Test description";
const mockStore = configureStore();
const store = mockStore({
  feedbackFormOpen: "closed",
  paginationDotClick: { click: false, targetSection: "" },
  socialNetworks: { data: []},
});
const mockHistoryReplace = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    replace: () => mockHistoryReplace,
  }),
}));

test("AutoFromUsa is rendered correctly", () => {
  jest.mock("react-router-dom", () => ({
    useHistory: () => ({
      replace: jest.fn(),
    }),
  }));

  render(
    <Provider store={store}>
      <AutoFromUsa className={mockSectionClassName} heading={mockHeadingText} />
    </Provider>
  );
});

test("AutoFromUsa contains elements", () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <AutoFromUsa className={mockSectionClassName} heading={mockHeadingText}>
        <div className="auto-from-usa__wrapper">
          <h1 className="auto-from-usa__heading">{mockHeadingText}</h1>
          <p className="auto-from-usa__description">{mockSectionDescription}</p>
          <Button text="testBtn" />
        </div>
      </AutoFromUsa>
    </Provider>
  );
  mockAllIsIntersecting(true);
  const btnText = getByTestId("btn");
  expect(btnText).toBeDefined();
});
