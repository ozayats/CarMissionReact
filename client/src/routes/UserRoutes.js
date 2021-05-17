import React from "react";
import { Route, Switch } from "react-router-dom";
import MainPage from "../pages/MainPage/MainPage";
import Page404 from "../pages/Page404/Page404";
import RegistrationPage from "../pages/RegistrationPage/RegistrationPage";
import BlogPageContainer from "../pages/BlogPage/PageContainer/BlogPageContainer";

const UserRoutes = () => {
  return (
    <Switch>
      <Route exact path="/" component={MainPage} />
      <Route exact path="/blog/:id" component={BlogPageContainer} />
      <Route exact path="/catalog-usa" render={() => <p>cars from usa</p>} />
      <Route
        exact
        path="/catalog-in-stock"
        render={() => <p>cars in stock</p>}
      />
      <Route
        exact
        path="/catalog-usa/:carId"
        render={() => <p>full info for car from usa</p>}
      />
      <Route
        exact
        path="/catalog-in-stock/:carId"
        render={() => <p>full info for car in stock</p>}
      />
      <Route path="/users/registration/invite" component={RegistrationPage} />
      <Route path="*" component={Page404} />
    </Switch>
  );
};

export default UserRoutes;
