import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import SectionHeading from "../../../../components/generalComponents/SectionHeading/SectionHeading";
import Button from "../../../../components/generalComponents/Button/Button";
import "./FormContainerSocialNetworks.scss";
import { getSocialNetworks } from "../../../../store/socialNetworks/selectors";
import FormItemSocialNetworks from "../FormItem/FormItemSocialNetworks";
import {
  filterSocialNetworks,
  updateSocialNetworkNewObject,
  updateSocialNetwroksByNewSrc,
} from "../../../../store/socialNetworks/operations";
import enhanceFormItem from "../../../../components/hoc/enhanceFromItem";
import { addNewSocialNetworks } from "../../../../store/socialNetworks/actions";

const config = {
  dropZone: true,
  canBeDeleted: true,
  pathProp: "iconSrc",
  routes: {
    post: "/api/social-networks/",
    put: "/api/social-networks/",
    delete: "/api/social-networks/delete/",
    upload: "/api/social-networks/upload/",
  },
  actions: {
    filterDeleted: filterSocialNetworks,
    updateS3Link: updateSocialNetwroksByNewSrc,
    addNew: addNewSocialNetworks,
    updateInRedux: updateSocialNetworkNewObject,
  },
};

const FormContainerSocialNetworks = () => {
  const [items, setItems] = useState([]);
  const data = useSelector(getSocialNetworks);
  const mainClassName = "admin-networks";

  const createNewItem = () => {
    const empty = {
      isEnabled: true,
      name: "",
      namePlaceholder: "Введите название соцсети",
      url: "",
      urlPlaceholder: "Введите ссылку на соцсеть",
      iconSrc: "",
      iconSrcPlaceholder: "Заполнится автоматически после загрузки",
      className: { mainClassName },
    };
    const Enhanced = enhanceFormItem(FormItemSocialNetworks, config);
    return (
      <Enhanced
        sourceObj={empty}
        isNew
        key={Date.now()}
        className={mainClassName}
      />
    );
  };

  useEffect(() => {
    const mapFormToRender = () => {
      return data.map((item) => {
        const Enhanced = enhanceFormItem(FormItemSocialNetworks, config);
        return (
          <Enhanced sourceObj={item} key={item._id} className={mainClassName} />
        );
      });
    };
    setItems(mapFormToRender());
  }, [data]);

  const addNewItem = () => {
    const form = createNewItem();

    const updated = items.map((i) => i);
    updated.push(form);
    setItems(updated);
  };

  return (
    <div className={mainClassName}>
      <SectionHeading
        className={`${mainClassName}__main-header`}
        text="Социальные сети"
      />
      <div className={`${mainClassName}__menu`}>{items}</div>
      <Button
        className={`${mainClassName}__add-btn`}
        text="+"
        onClick={addNewItem}
      />
    </div>
  );
};

export default FormContainerSocialNetworks;
