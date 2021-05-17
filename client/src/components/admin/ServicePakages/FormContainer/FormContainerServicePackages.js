import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import SectionHeading from "../../../generalComponents/SectionHeading/SectionHeading";
import { getPackages } from "../../../../store/servicePackages/selectors";
import FormItemServicePackages from "../FormItem/FormItemServicePackages";
import "./FormContainerServicePackages.scss";
import Button from "../../../generalComponents/Button/Button";
import {
  filterServicePackages,
  updatePackagesByNewObject,
} from "../../../../store/servicePackages/operations";
import enhanceFormItem from "../../../hoc/enhanceFromItem";
import { addPackages } from "../../../../store/servicePackages/actions";

const config = {
  canBeDeleted: true,
  routes: {
    post: "/api/service-packages/",
    put: "/api/service-packages/",
    delete: "/api/service-packages/delete/",
  },
  actions: {
    filterDeleted: filterServicePackages,
    addNew: addPackages,
    updateInRedux: updatePackagesByNewObject,
  },
};

const FormContainerServicePackages = () => {
  const [formList, setFormList] = useState([]);
  const data = useSelector(getPackages);

  useEffect(() => {
    const mapFormToRender = () => {
      return data.map((servicePackage) => {
        const Enhanced = enhanceFormItem(FormItemServicePackages, config);
        return <Enhanced sourceObj={servicePackage} key={servicePackage._id} />;
      });
    };
    setFormList(mapFormToRender());
  }, [data]);

  const createNewFormItem = () => {
    const empty = {
      name: "",
      price: "",
      currency: "",
      serviceList: [],
    };
    const Enhanced = enhanceFormItem(FormItemServicePackages, config);
    return <Enhanced sourceObj={empty} isNew key={Date.now()} />;
  };

  const handleAddItem = () => {
    const form = createNewFormItem();
    const updated = formList.map((i) => i);
    updated.push(form);
    setFormList(updated);
  };

  return (
    <div className="admin-packages">
      <SectionHeading text="Пакеты услуг" />
      <div className="admin-packages__form-container">{formList}</div>
      <Button
        text="+"
        className="admin-packages__add-btn"
        onClick={handleAddItem}
      />
    </div>
  );
};

export default FormContainerServicePackages;
