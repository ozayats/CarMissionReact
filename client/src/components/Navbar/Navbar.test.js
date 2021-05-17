import React from "react";
import { fireEvent, render } from "@testing-library/react";
import Navbar from "./Navbar";

jest.mock("../NavbarItem/NavbarItem", () => () => <div data-testid="testNavbarItem">Item</div>)


test("Navbar render simple ul tag when window is desktop", () => {
  const { getByTestId } = render(<Navbar />);

  const navbar = getByTestId("desktopNavbarList");

  expect(navbar).toBeInTheDocument()
});

test("Navbar render mobile version of navbar", () => {
  const { getByTestId } = render(<Navbar mobileNavbar/>);

  const navbar = getByTestId("mobileNavbarList");

  expect(navbar).toBeInTheDocument()
});

test("Navbar render list of items", () => {
  const { getByTestId } = render(<Navbar items={[{disabled: false, _id: 1, contacts: "contacts"}, {disabled: true, _id: 2}]}/>);

  const item = getByTestId("testNavbarItem");

  expect(item).toBeInTheDocument()
});

test("Navbar window have onClick function", () => {
  const clickFunc = jest.fn();
  const { getByTestId } = render(<Navbar items={[{disabled: false, _id: 1, contacts: "contacts"}, {disabled: false, _id: 2}]} mobileNavbar onClick={clickFunc} isFooter/>);

  jest.mock("uuid", () => () => jest.fn())

  const block = getByTestId("mobileNavbarBlock");

  expect(clickFunc).not.toHaveBeenCalled();
  fireEvent.click(block);
  expect(clickFunc).toHaveBeenCalledTimes(1);
});


