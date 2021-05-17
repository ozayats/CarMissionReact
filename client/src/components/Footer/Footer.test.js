import React from "react";
import { render } from "@testing-library/react";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import Footer from "./Footer";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

const mockStore = configureMockStore([thunk]);
const testStore = mockStore({
    navbar: {
        data: [{numberInNavbar: 2, footerLocation: "left-side"}, {numberInNavbar: 1, footerLocation: "right-side"}, {numberInNavbar: 3, footerLocation: "right-side"}],
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
    window.dispatchEvent(new Event("resize"));
}

jest.mock("../Navbar/Navbar", () => () => <div data-testid="navbar" onClick={jest.fn()}>Navbar</div>);
jest.mock("../generalComponents/Button/Button", () => () => <button data-testid="button">Touch</button>)
jest.mock("../Logo/Logo", () => () => <img data-testid="logo" alt="test-img"/>)
jest.mock("../SocialNetworks/SocialNetworks", () => () => <div data-testid="soc-nets"/>)

test("Is Footer return navbar-block", () => {
    const { getByTestId } = render(
        <Provider store={testStore}>
            <BrowserRouter>
                <Footer />
            </BrowserRouter>
        </Provider>
    )

    const navbarBlock = getByTestId("footerNavbarBlock");
    expect(navbarBlock).toBeDefined();
})

test("Is Footer return mobile navbar-block", () => {
    const mockDispatch = jest.fn();
    const mockSelector = jest.fn();
    jest.mock("react-redux", () => ({
        useDispatch: () => mockDispatch,
        useSelector: () => mockSelector,
    }));
    resizeWindow(500, 300);
    
    const { getByTestId } = render(
        <Provider store={testStore}>
            <BrowserRouter>
                <Footer />
            </BrowserRouter>
        </Provider>
    )

    const navbar = getByTestId("navbar");
    expect(navbar).toBeDefined();
})

test("Is Footer return navbar-block", () => {
    const { getByTestId } = render(
        <Provider store={testStore}>
            <BrowserRouter>
                <Footer />
            </BrowserRouter>
        </Provider>
    )

    const navbarBlock = getByTestId("footerNavbarBlock");
    expect(navbarBlock).toBeDefined();
})

