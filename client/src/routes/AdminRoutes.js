import React from "react";
import { Switch, Route } from "react-router-dom";
import FormContainerMainPageSections from "../components/admin/MainPageSections/FormContainer/FormContainer";
import FormContainerAboutUs from "../components/admin/AboutUs/FormContainer/FormContainerAboutUs";
import FormContainerWorkStages from "../components/admin/WorkStages/FormContainer/FormContainerWorkStages";
import FormContainerServicePakages from "../components/admin/ServicePakages/FormContainer/FormContainerServicePackages";
import Page404 from "../pages/Page404/Page404";
import FormContainerReviewCarousel from "../components/admin/ReviewCarousel/FormContainer/FormContainerReviewCarousel";
import FormContainerSocialNetworks from "../components/admin/SocialNetworks/FormContainer/FormContainerSocialNetworks";
import FormContainerBlogs from "../components/admin/Blogs/FormContainer/FormContainerBlogs";
import AdminsWrapper from "../components/admin/AdminUsers/AdminsWrapper/AdminsWrapper";
import { decodeUser } from "../utils/functions/decodeUser";
import FormContainerLogo from "../components/admin/Logo/FormConatiner/FormContainerLogo";
import FormContainerNavbar from "../components/admin/Navbar/FormContainer/FormContainerNavbar";
import Callbacks from "../components/admin/Callbacks/Main/Callbacks";

const AdminRoutes = () => {
  const { isOwner } = decodeUser().decoded;

  return (
    <Switch>
      <Route exact path="/admin/" />
      <Route exact path="/admin/navbar" component={FormContainerNavbar} />
      <Route exact path="/admin/logo" component={FormContainerLogo} />
      <Route
        exact
        path="/admin/main-page-sections"
        component={FormContainerMainPageSections}
      />
      <Route exact path="/admin/about-us" component={FormContainerAboutUs} />
      <Route
        exact
        path="/admin/work-stages"
        component={FormContainerWorkStages}
      />
      <Route
        exact
        path="/admin/social-networks"
        component={FormContainerSocialNetworks}
      />
      <Route
        exact
        path="/admin/service-packages"
        component={FormContainerServicePakages}
      />
      <Route
        exact
        path="/admin/reviews"
        component={FormContainerReviewCarousel}
      />
      <Route exact path="/admin/callback-requests" component={Callbacks} />
      <Route exact path="/admin/blogs" component={FormContainerBlogs} />
      {isOwner && <Route exact path="/admin/users" component={AdminsWrapper} />}
      <Route path="*" component={Page404} />
    </Switch>
  );
};

export default AdminRoutes;
