import * as React from "react";
import { render, fireEvent, waitForElement } from "@testing-library/react";
import BlogPageErrorItem from "./BlogPageErrorItem";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

const mockStore = configureMockStore([thunk]);
const testStore = mockStore({})

const testData = {
  className: "test-class",
  src: "/test/photo",
  title: "This is title",
};

jest.mock("../../../components/Image/Image", () => () => <img data-testid="test-img" alt="test-alt" src={testData.src}/>);
jest.mock("../../../components/generalComponents/SectionHeading/SectionHeading", () => () => <h2 data-testid="test-header">{testData.title}</h2>);

test("Is BlogPageErrorItem receive correct text", () => {
  const { className, src, title } = testData;
  const { getAllByText } = render(
    <Provider store={testStore}>
      <BlogPageErrorItem className={className} img={src}/>
    </Provider>
  )

  getAllByText(title);
})

test("Is BlogPageErrorItem receive correct text", () => {
  const { className, src } = testData;
  const { getByTestId } = render(
    <Provider store={testStore}>
      <BlogPageErrorItem className={className} img={src}/>
    </Provider>
  )

  const image = getByTestId("test-img");
  expect(image.src).toBe(`http://localhost${src}`);
})

test("Is BlogPageErrorItem have button onClick function", () => {
  const mockDispatch = jest.fn();
  jest.mock("react-redux", () => ({
      useDispatch: () => mockDispatch,
  }));

  const { className } = testData;
  const { getByTestId } = render(
    <Provider store={testStore}>
      <BlogPageErrorItem className={className} />
    </Provider>
  )

  const button = getByTestId("btn");
  
  expect(button).toBeInTheDocument();
  expect(mockDispatch).not.toBeCalled();
  fireEvent.click(button);
})

test("Is BlogPageErrorItem receive correct class-name", () => {
  const { className, src} = testData;
  const { getByTestId } = render(
    <Provider store={testStore}>
      <BlogPageErrorItem className={className} img={src}/>
    </Provider>
  )

  const container = getByTestId("errorPageTextContent");
  expect(container.className).toBe(`${className}__text-content`);
})

test("Is BlogPageErrorItem have default props for class-name", () => {
  const defaultClassName = "blog-page";
  const { getByTestId } = render(
    <Provider store={testStore}>
      <BlogPageErrorItem />
    </Provider>
  )

  const container = getByTestId("errorPageTextContent");
  expect(container.className).toBe(`${defaultClassName}__text-content`);
})






