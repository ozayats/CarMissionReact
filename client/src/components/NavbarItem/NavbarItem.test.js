import React from "react";
import { fireEvent, render } from "@testing-library/react";
import NavbarItem from "./NavbarItem.js";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { BrowserRouter, Router, Route } from "react-router-dom";
import { createMemoryHistory } from "history";

const mockStore = configureStore();
const store = mockStore({
    navbar: { 
        data: []
    },
    appMainSections: {
        sections: []
    }
});

test("Is NavbarItem HashLink have correct id", () => {
    const { getByTestId } = render(
        <Provider store={store}>
            <BrowserRouter>
                <NavbarItem id="test-id"/>
            </BrowserRouter>
        </Provider>
    )

    const link = getByTestId("navbarSimpleItem");
    expect(link.id).toBe("test-id");
})


test("Is NavbarItem HashLink have correct textContent", () => {   
    const { getByText } = render(
        <Provider store={store}>
            <BrowserRouter>
                <NavbarItem textContent="some text"/>
            </BrowserRouter>
        </Provider>
    )

    getByText("some text");
})

test("Is NavbarItem HashLink have correct textContent", () => {   
    const { getByText } = render(
        <Provider store={store}>
            <BrowserRouter>
                <NavbarItem isFooter contacts="contacts"/>
            </BrowserRouter>
        </Provider>
    )
    
    getByText("contacts");
})

test("Is NavbarItem HashLink have onClick, if navbar render on footer", () => {   
    const mockDispatch = jest.fn();
    const mockSelector = jest.fn();
    jest.mock("react-redux", () => ({
        useDispatch: () => mockDispatch,
        useSelector: () => mockSelector,
    }));

    const { getByTestId } = render(
        <Provider store={store}>
            <BrowserRouter>
                <NavbarItem isFooter contacts="contacts"/>
            </BrowserRouter>
        </Provider>
    )
    
    const link = getByTestId("navbarSimpleItem");
    fireEvent.click(link);
})

test("Is NavbarItem render hashlink", () => {   
    const mockDispatch = jest.fn();
    const mockSelector = jest.fn();
    jest.mock("react-redux", () => ({
        useDispatch: () => mockDispatch,
        useSelector: () => mockSelector,
    }));

    const { getByTestId } = render(
        <Provider store={store}>
            <BrowserRouter>
                <NavbarItem sectionId="test-id"/>
            </BrowserRouter>
        </Provider>
    )
    
    const link = getByTestId("navbarItemHashLink");
    fireEvent.click(link);
})

test("Is NavbarItem render other page content", () => {   
    function renderWithRouterMatch(
        ui,
        {
          path = "/blogs/:id",
          route = "/blogs/1234",
          history = createMemoryHistory({ initialEntries: [route] })
        } = {}
      ) {
        return {
          ...render(
            <Provider store={store}>
              <Router history={history}>
                <Route path={path} component={ui} />
              </Router>
            </Provider>
          )
        };
      }

      const routePath = {
        route: "/blogs/1234",
        path: "/blogs/:id"
      }
        
      const { getByTestId } = renderWithRouterMatch(() => <NavbarItem sectionId="id" />, {routePath});
          
    getByTestId("navbarItemNavHashLink");
})


