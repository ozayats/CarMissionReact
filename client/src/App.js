import React, { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import Loader from "./components/Loader/Loader";
import { loadLogoData } from "./store/logo/operations";
import { useDispatch, useSelector } from "react-redux";
import { getIsLogoLoading } from "./store/logo/selectors";
import { getIsNavbarLoading } from "./store/navbar/selectors";
import { loadNavbarData } from "./store/navbar/operations";
import { loadMainSection } from "./store/appMainSections/operations";
import "./theme/styles/App.scss";
import FeedbackForm from "./components/FeedbackForm/Main/FeedbackForm";
import { loadFeatures } from "./store/aboutUs/operations";
import { loadPackages } from "./store/servicePackages/operations";
import { loadWorkStages } from "./store/workStages/operations";
import { loadReviews } from "./store/ReviewCarousel/operations";
import { loadBlogs } from "./store/Blogs/operations";
import { checkToken } from "./store/auth/operations";
import ReduxToastr from "react-redux-toastr";
import { useLocation } from "react-router-dom";
import { loadSocialNetworks } from "./store/socialNetworks/operations";
import { getMainSectionsIsLoading } from "./store/appMainSections/selectors";

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(loadBlogs());
    dispatch(loadMainSection());
    dispatch(loadSocialNetworks());
    dispatch(loadNavbarData());
    dispatch(loadLogoData());
    dispatch(loadFeatures());
    dispatch(loadPackages());
    dispatch(loadWorkStages());
    dispatch(loadReviews());
    dispatch(checkToken());
  }, [dispatch]);

  const isLogoLoading = useSelector(getIsLogoLoading);
  const isNavbarLoading = useSelector(getIsNavbarLoading);
  const isMainSectionsLoading = useSelector(getMainSectionsIsLoading);
  const isMainPage = location.pathname === "/";

  if (isMainSectionsLoading || isNavbarLoading || isLogoLoading) {
    return (
      <div className="App">
        <Loader />
      </div>
    );
  }

  return (
    <div className={isMainPage ? "App" : "App__bg"}>
      <FeedbackForm />
      <AppRoutes />
      <ReduxToastr
        timeOut={5000}
        newestOnTop
        preventDuplicates
        position="top-right"
        getState={(state) => state.toastr}
        transitionIn="fadeIn"
        transitionOut="fadeOut"
        progressBar
      />
    </div>
  );
};

export default App;
