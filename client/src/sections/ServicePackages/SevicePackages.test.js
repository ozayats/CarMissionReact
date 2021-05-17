import React from "react";
import { render } from "@testing-library/react";
import ServicePackages from "./ServicePackages";
import SectionHeading from "../../components/generalComponents/SectionHeading/SectionHeading";
import { mockAllIsIntersecting } from "react-intersection-observer/test-utils";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";

const mockStore = configureStore();
const store = mockStore({
  paginationDotClick: { click: false, targetSection: "" },
  servicePackages: { packages: [] },
});

jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    replace: jest.fn(),
  }),
}));

test("ServicePackages is rendered correctly", () => {
  const mockDispatch = jest.fn();
  const mockSelector = jest.fn();
  jest.mock("react-redux", () => ({
    useDispatch: () => mockDispatch,
    useSelector: () => mockSelector,
  }));
  const mockSectionClassName = "service-packages";
  render(
    <Provider store={store}>
      <ServicePackages className={mockSectionClassName} heading="test" />
    </Provider>
  );
  mockAllIsIntersecting(true);
});

const mockHistoryReplace = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    replace: () => mockHistoryReplace,
  }),
}));

const mockHeadingText = "Test heading";
const mockPackageClassName = "service-packages";

test("ServicePackages contains sections", () => {
  const mockDispatch = jest.fn();
  const mockSelector = jest.fn();
  jest.mock("react-redux", () => ({
    useDispatch: () => mockDispatch,
    useSelector: () => mockSelector,
  }));
  const { getByTestId } = render(
    <Provider store={store}>
      <ServicePackages heading={mockHeadingText}>
        <SectionHeading text={mockHeadingText} />
        <div className={mockPackageClassName} />
      </ServicePackages>
    </Provider>
  );
  mockAllIsIntersecting(true);
  const headingText = getByTestId("section-heading");
  expect(headingText).toBeDefined();
});
