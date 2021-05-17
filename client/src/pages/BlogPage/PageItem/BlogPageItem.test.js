import * as React from "react";
import { render, fireEvent, waitForElement, getByText } from "@testing-library/react";
import BlogPageItem from "./BlogPageItem";

const testData = {
  fullText: "Test full text",
  date: "1612550152581",
  photo: "/test/photo",
  title: "This is title",
};

const testClassName = "test-class";

jest.mock("../../../components/Image/Image", () => () => <img data-testid="test-img" alt="test-alt" src="/folder/test"/>);
jest.mock("../../../components/generalComponents/SectionHeading/SectionHeading", () => () => <h2 data-testid="test-header">{testData.title}</h2>);

test("Is BlogPageItem receive correct fullText", () => {
  const { getByText } = render(<BlogPageItem className={testClassName} data={testData}/>)

  getByText(testData.fullText);
})

test("Is BlogPageItem receive correct date", () => {
  const { getByText } = render(<BlogPageItem className={testClassName} data={testData}/>)

  getByText("05.02.2021");
})

test("Is BlogPageItem receive correct title", () => {
  const { getByText } = render(<BlogPageItem className={testClassName} data={testData}/>)

  getByText(testData.title);
})

test("Is function correctNums return correct result", () => {
  testData.date = "1513550152581"
  const { getByText } = render(<BlogPageItem className={testClassName} data={testData}/>)

  getByText("18.12.2017");
})


