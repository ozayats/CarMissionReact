import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FormItem from "../FormItem/FormItem";
import SectionHeading from "../../../generalComponents/SectionHeading/SectionHeading";
import "./FormContainer.scss";
import { getMainSections } from "../../../../store/appMainSections/selectors";
import enhanceFormItem from "../../../hoc/enhanceFromItem";
import {
  updateMainSectionByNewSrc,
  updateMainSectionsByNewObject,
} from "../../../../store/appMainSections/operations";

const createConfig = (pathProp) => ({
  dropZone: !!pathProp,
  pathProp: "imgPath",
  routes: {
    put: "/api/sections-main/",
    upload: "/api/sections-main/upload/",
  },
  actions: {
    updateS3Link: updateMainSectionByNewSrc,
    updateInRedux: updateMainSectionsByNewObject,
  },
});

const FormContainerMainPageSections = () => {
  const [formList, setFormList] = useState([]);
  const data = useSelector(getMainSections);

  useEffect(() => {
    const mapFormList = () =>
      data.map((section) => {
        const Enhanced = enhanceFormItem(
          FormItem,
          createConfig(section.imgPath)
        );
        return <Enhanced sourceObj={section} key={section._id} />;
      });

    setFormList(mapFormList());
  }, [data]);

  return (
    <div className="admin">
      <div className="admin__container-head">
        <SectionHeading text="Секции главной страницы" />
      </div>
      <div className="admin__form-container">{formList}</div>
    </div>
  );
};

export default FormContainerMainPageSections;
