import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./FormContainerAboutUs.scss";
import { getFeatures } from "../../../../store/aboutUs/selectors";
import SectionHeading from "../../../generalComponents/SectionHeading/SectionHeading";
import Button from "../../../generalComponents/Button/Button";
import FormItemAboutUs from "../FormItem/FormItemAboutUs";
import { getMainSections } from "../../../../store/appMainSections/selectors";
import {
  filterAboutUs,
  updateFeaturesByNewObject,
  updateFeaturesByNewSrc,
} from "../../../../store/aboutUs/operations";
import enhanceFormItem from "../../../hoc/enhanceFromItem";
import { addNewFeature } from "../../../../store/aboutUs/actions";

const config = {
  dropZone: true,
  canBeDeleted: true,
  pathProp: "imgPath",
  routes: {
    post: "/api/features/",
    put: "/api/features/",
    delete: "/api/features/delete/",
    upload: "/api/features/upload/",
  },
  actions: {
    filterDeleted: filterAboutUs,
    updateS3Link: updateFeaturesByNewSrc,
    addNew: addNewFeature,
    updateInRedux: updateFeaturesByNewObject,
  },
};

const FormContainerAboutUs = () => {
  const [formList, setFormList] = useState([]);
  const data = useSelector(getFeatures).sort((a, b) => {
    return a.isMain === b.isMain ? 0 : a.isMain ? -1 : 1;
  });
  const { heading } = useSelector(getMainSections).find(
    (s) => s.reactComponent === "AboutUs"
  );

  useEffect(() => {
    const mapFormToRender = () => {
      return data.map((feature) => {
        const Enhanced = enhanceFormItem(FormItemAboutUs, config);
        return <Enhanced sourceObj={feature} key={feature._id} />;
      });
    };
    setFormList(mapFormToRender());
  }, [data]);

  const createNewFormItem = () => {
    const empty = {
      title: "",
      imgPath: "",
      isMain: false,
      text: null,
    };
    const Enhanced = enhanceFormItem(FormItemAboutUs, config);
    return <Enhanced sourceObj={empty} isNew key={Date.now()} />;
  };

  const handleAddItem = () => {
    const form = createNewFormItem();

    const updated = formList.map((i) => i);
    updated.push(form);
    setFormList(updated);
  };

  return (
    <div className="admin-about-us">
      <SectionHeading text={heading} />
      <div className="admin-about-us__form-container">{formList}</div>
      <Button
        text="+"
        className="admin-about-us__add-btn"
        onClick={handleAddItem}
      />
    </div>
  );
};

export default FormContainerAboutUs;
