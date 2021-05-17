import React from "react";
import { fireEvent, render } from "@testing-library/react";
import SocialNetworks from "./SocialNetworks";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";


jest.mock("../SocialNetworksItem/SocialNetworksItem", () => () => <div data-testid="sn-item"></div>);

const mockStore = configureMockStore([thunk]);
const testStore = mockStore({
    socialNetworks: {
        data: [{isEnabled: true, id: 1}, {isEnabled: false, id: 2}],
    },
})


test("SocialNetwork is correct render with array of items", () => {   
    const mockDispatch = jest.fn();
    const mockSelector = jest.fn();
    jest.mock("react-redux", () => ({
        useDispatch: () => mockDispatch,
        useSelector: () => mockSelector,
    }));

    const { getByTestId } = render(
        <Provider store={testStore}>
            <BrowserRouter>
                <SocialNetworks className="test-name"/>
            </BrowserRouter>
        </Provider>
    )

    const list = getByTestId("socialNetworks");
    expect(list).toBeInTheDocument();
    
})
