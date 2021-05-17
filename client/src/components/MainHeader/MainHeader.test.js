import * as React from "react";
import { render, fireEvent, waitForElement } from "@testing-library/react";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import MainHeader from "./MainHeader";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

const mockStore = configureMockStore([thunk]);
const testStore = mockStore({
    navbar: {
        data: [{numberInNavbar: 1, headerLocation: "left-side"}, {numberInNavbar: 2, headerLocation: "right-side"}],
    },
    logo: {
        path: "/test-path"
    },
    appMainSections: {
        sections: []
    }

})

const resizeWindow = (x, y) => {
    window.innerWidth = x;
    window.innerHeight = y;
    window.dispatchEvent(new Event('resize'));
}



jest.mock("../Navbar/Navbar", () => () => <div data-testid="navbar">Navbar</div>);
jest.mock("../generalComponents/Button/Button", () => () => <button data-testid="button" >Touch</button>)
jest.mock("../Logo/Logo", () => () => <img data-testid="logo"/>)

test("Is MainHeader return navbar-block", () => {
    const { getByTestId } = render(
        <Provider store={testStore}>
            <BrowserRouter>
                <MainHeader />
            </BrowserRouter>
        </Provider>
    )

    const navbarBlock = getByTestId("navbar-block");
    expect(navbarBlock).toBeDefined();
    expect(navbarBlock.className).toBe("navbar__block");
})

test("Is MainHeader return Logo", () => {
    const { getByTestId } = render(
        <Provider store={testStore}>
            <BrowserRouter>
                <MainHeader />
            </BrowserRouter>
        </Provider>
    )

    getByTestId("logo")
})

test("Is MainHeader button have onClick ", () => {
    const mockDispatch = jest.fn();
    const mockSelector = jest.fn();
    jest.mock("react-redux", () => ({
        useDispatch: () => mockDispatch,
        useSelector: () => mockSelector,
    }));


    resizeWindow(500, 300);

    const { getByTestId, getByText } = render(
        <Provider store={testStore}>
            <BrowserRouter>
                <MainHeader />
            </BrowserRouter>
        </Provider>
    )

    getByText("Touch");
    const button = getByTestId("button");
    expect(button).toBeInTheDocument();
})

test("Is MainHeader have navbar", () => {
    const mockDispatch = jest.fn();
    const mockSelector = jest.fn();
    jest.mock("react-redux", () => ({
        useDispatch: () => mockDispatch,
        useSelector: () => mockSelector,
    }));
    
    const stateSetter = jest.fn()
    jest.spyOn(React, 'useState').mockImplementation(isMobileNavbar => [isMobileNavbar=true, stateSetter])

    resizeWindow(500, 300);

    const { getByTestId, container } = render(
        <Provider store={testStore}>
            <BrowserRouter>
                <MainHeader />
            </BrowserRouter>
        </Provider>
    )
    const navbar = getByTestId("navbar");
    expect(navbar).toBeInTheDocument();
})

