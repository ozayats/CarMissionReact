import React from "react";
import { useSelector } from "react-redux";
import { getMainSections } from "../../store/appMainSections/selectors";
import WorkStages from "../../sections/WorkStages/Main/WorkStages";
import AutoFromUsa from "../../sections/AutoFromUSA/AutoFromUsa";
import AboutUs from "../../sections/AboutUs/AboutUs";
import ReviewCarousel from "../../components/ReviewCarousel/ReviewCarousel";
import Blogs from "../../components/Blogs/Blogs";
import ServicePackages from "../../sections/ServicePackages/ServicePackages";
import { Helmet } from "react-helmet-async";
import PaginationDots from "../../components/PaginationDots/PaginationDots";
import MainHeader from "../../components/MainHeader/MainHeader";

const MainPage = () => {
  const sectionsFromDB = useSelector(getMainSections).filter(
    (section) => !section.disabled
  );

  const sectionsComponents = {
    WorkStages,
    AutoFromUsa,
    AboutUs,
    ReviewCarousel,
    Blogs,
    ServicePackages,
  };

  const mapComponentsToRender = () => {
    return sectionsFromDB.map((section) => {
      const {
        description,
        _id: id,
        heading,
        name,
        reactComponent,
        index,
        imgPath,
      } = section;
      const Component = sectionsComponents[reactComponent];

      if (Component) {
        return index === 1 ? (
          <div
            className="App__main-page-top-head"
            style={{ backgroundImage: `url(${imgPath})` }}
            key={id}
          >
            <MainHeader />
            <Component
              description={description}
              heading={heading}
              anchorName={name}
            />
          </div>
        ) : (
          <Component
            description={description}
            heading={heading}
            anchorName={name}
            key={id}
          />
        );
      }

      return null;
    });
  };

  const filteredReadySections = mapComponentsToRender().filter(
    (i) => i !== null
  );

  return (
    <>
      <Helmet>
        <title>Main Page</title>
      </Helmet>
      <PaginationDots componentsList={sectionsFromDB} />
      {filteredReadySections}
    </>
  );
};

export default MainPage;
