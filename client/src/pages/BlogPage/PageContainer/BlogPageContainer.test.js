import * as React from "react";
import { render, fireEvent, waitForElement, getByText } from "@testing-library/react";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import BlogPageContainer from "./BlogPageContainer";
import { Provider } from "react-redux";
import { BrowserRouter, Router, Route } from "react-router-dom";
import { createMemoryHistory } from "history";

const mockStore = configureMockStore([thunk]);
const testStore = mockStore({
    blogs: {
        blogs: [{photo: "/img/test-img.png", title: "Test title", text: "Some text", buttonText: "See more", date: "1612550152581", _id: "1"}, {photo: "/img/test-img2.png", title: "Another test title", text: "Some text", buttonText: "See more", date: "1212550152590", _id: "2"}],
        isLoading: false,
    },
    paginationDotClick: {
      targetSection: "section"
    }
})

export function renderWithRouterMatch(
  ui,
  {
    path = "/",
    route = "/",
    history = createMemoryHistory({ initialEntries: [route] })
  } = {}
) {
  return {
    ...render(
      <Provider store={testStore}>
        <Router history={history}>
          <Route path={path} component={ui} />
        </Router>
      </Provider>
    )
  };
}



jest.mock("../PageItem/BlogPageErrorItem", () => () => <div data-testid="blogErrorItem">This is test blog item</div>);
jest.mock("../PageItem/BlogPageItem", () => () => <div data-testid="blogItem">This is test error blog item</div>);
jest.mock("../../../components/Blogs/Blogs"), () => () => <div data-testid="blogs">This is list of blogs</div>;

test("Is BlogPageContainer return correct dates in blog page item", () => {
  window.scrollTo = jest.fn()
  const routePath = {
    route: "/project/ABC123",
    path: "/project/:id"
  }
   
  const { getByText } = renderWithRouterMatch(BlogPageContainer, {routePath});

  getByText("05.02.2021");
  getByText("04.06.2008");

});

test("Is BlogPageContainer return correct headers blog page item", () => {
  const routePath = {
    route: "/project/ABC123",
    path: "/project/:id"
  }
   
  const { getByText } = renderWithRouterMatch(BlogPageContainer, {routePath});

  getByText("This is test blog item");
  getByText("Another test title");
});

test("Is BlogPageContainer return loader", () => {
  const newTestStore = mockStore({
    blogs: {
        blogs: [{photo: "/img/test-img.png", title: "Test title", text: "Some text", buttonText: "See more", date: "1612550152581", _id: "1"}, {photo: "/img/test-img2.png", title: "Another test title", text: "Some text", buttonText: "See more", date: "1212550152590", _id: "2"}],
        isLoading: true,
    },
    paginationDotClick: {
      targetSection: "section"
    }
  })

  function renderWithRouterMatch(
    ui,
    {
      path = "/",
      route = "/",
      history = createMemoryHistory({ initialEntries: [route] })
    } = {}
  ) {
    return {
      ...render(
        <Provider store={newTestStore}>
          <Router history={history}>
            <Route path={path} component={ui} />
          </Router>
        </Provider>
      )
    };
  }

  const routePath = {
    route: "/project/ABC123",
    path: "/project/:id"
  }

    
  const { getByTestId } = renderWithRouterMatch(BlogPageContainer, {routePath});


  getByTestId("loader");
  

});

test("Is BlogPageContainer return error blog item", () => {
  const newTestStore = mockStore({
    blogs: {
        blogs: [{photo: "/img/test-img.png", title: "Test title", text: "Some text", buttonText: "See more", date: "1612550152581", _id: "1"}, {photo: "/img/test-img2.png", title: "Another test title", text: "Some text", buttonText: "See more", date: "1212550152590", _id: "2"}],
        isLoading: false,
    },
    paginationDotClick: {
      targetSection: "section"
    }
  })

function renderWithRouterMatch(
  ui,
  {
    path = "/",
    route = "/",
    history = createMemoryHistory({ initialEntries: [route] })
  } = {}
) {
  return {
    ...render(
      <Provider store={newTestStore}>
        <Router history={history}>
          <Route path={path} component={ui} />
        </Router>
      </Provider>
    )
  };
}


  const routePath = {
    route: "/project/987654321",
    path: "/project/:id"
  }

    
  const { getByTestId } = renderWithRouterMatch(BlogPageContainer, {routePath});

  getByTestId("blogErrorItem")

});

test("Is BlogPageContainer return blog item", () => {
  const newTestStore = mockStore({
    blogs: {
        blogs: [{photo: "/img/test-img.png", title: "Test title", text: "Some text", buttonText: "See more", date: "1612550152581", _id: "1"}, {photo: "/img/test-img2.png", title: "Another test title", text: "Some text", buttonText: "See more", date: "1212550152590", _id: "2"}],
        isLoading: false,
    },
    paginationDotClick: {
      targetSection: "section"
    }
  })

  function renderWithRouterMatch(
    ui,
    {
      path = "/blog/:id",
      route = "/blog/2",
      history = createMemoryHistory({ initialEntries: [route] })
    } = {}
  ) {
    return {
      ...render(
        <Provider store={newTestStore}>
          <Router history={history}>
            <Route path={path} component={ui} />
          </Router>
        </Provider>
      )
    };
  }

  const routePath = {
    path: "/:id",
    route: "/2",
  }

  const { getByTestId } = renderWithRouterMatch(BlogPageContainer, {routePath});

  getByTestId("blogItem")

});