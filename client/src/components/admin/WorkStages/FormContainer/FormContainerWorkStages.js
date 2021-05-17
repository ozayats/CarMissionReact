import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getWorkStages } from "../../../../store/workStages/selectors";
import FormItemWorkStages from "../FormItem/FormItemWorkStages";
import SectionHeading from "../../../generalComponents/SectionHeading/SectionHeading";
import "./FormContainerWorkStages.scss";
import Button from "../../../generalComponents/Button/Button";
import { getMainSections } from "../../../../store/appMainSections/selectors";
import {
  filterWorkStages,
  updateStagesByNewObject,
  updateStagesByNewSrc,
} from "../../../../store/workStages/operations";
import enhanceFormItem from "../../../hoc/enhanceFromItem";
import { addNewStage } from "../../../../store/workStages/actions";

const config = {
  dropZone: true,
  canBeDeleted: true,
  pathProp: "iconSrc",
  routes: {
    post: "/api/work-stages/",
    put: "/api/work-stages/",
    delete: "/api/work-stages/delete/",
    upload: "/api/work-stages/upload/",
  },
  actions: {
    filterDeleted: filterWorkStages,
    updateS3Link: updateStagesByNewSrc,
    addNew: addNewStage,
    updateInRedux: updateStagesByNewObject,
  },
};

const FormContainerWorkStages = () => {
  const [formList, setFormList] = useState([]);
  const data = useSelector(getWorkStages);
  const { heading } = useSelector(getMainSections).find(
    (s) => s.reactComponent === "WorkStages"
  );

  useEffect(() => {
    const mapFormToRender = () => {
      return data.map((stage) => {
        const Enhanced = enhanceFormItem(FormItemWorkStages, config);
        return <Enhanced sourceObj={stage} key={stage._id} />;
      });
    };
    setFormList(mapFormToRender());
  }, [data]);

  const createNewFormItem = () => {
    const empty = {
      num: "",
      name: "",
      iconSrc: "",
    };
    const Enhanced = enhanceFormItem(FormItemWorkStages, config);
    return <Enhanced sourceObj={empty} isNew key={Date.now()} />;
  };

  const handleAddItem = () => {
    const form = createNewFormItem();

    const updated = formList.map((i) => i);
    updated.push(form);
    setFormList(updated);
  };

  return (
    <div className="admin-stages">
      <SectionHeading text={heading} />
      <div className="admin-stages__form-container">{formList}</div>
      <Button
        text="+"
        className="admin-stages__add-btn"
        onClick={handleAddItem}
      />
    </div>
  );
};

export default FormContainerWorkStages;
