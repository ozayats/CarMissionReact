import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getNavbarData } from "../../../../store/navbar/selectors";
import { getMainSections } from "../../../../store/appMainSections/selectors";
import FormItemNavbar from "../FormItem/FormItemNavbar";
import SectionHeading from "../../../generalComponents/SectionHeading/SectionHeading";
import Button from "../../../generalComponents/Button/Button";
import "./FormContainerNavbar.scss";
import {
  filterNavbarData,
  updateNavbarDataByNewObject,
} from "../../../../store/navbar/operations";
import enhanceFormItem from "../../../hoc/enhanceFromItem";
import { addNewItem } from "../../../../store/navbar/actions";

const config = {
  dropZone: false,
  canBeDeleted: true,
  routes: {
    post: "/api/navbar/",
    put: "/api/navbar/",
    delete: "/api/navbar/delete/",
  },
  actions: {
    filterDeleted: filterNavbarData,
    addNew: addNewItem,
    updateInRedux: updateNavbarDataByNewObject,
  },
};

const FormContainerNavbar = () => {
  const navbarData = useSelector(getNavbarData);
  const sectionsData = useSelector(getMainSections);
  const mainClassName = "admin-navbar";
  const [navbarList, setNavbarList] = useState([]);
  const [sectionsLinkArr, setSectionsLinkArr] = useState([]);
  const [itemsCount, setItemsCount] = useState([]);

  const createNewFormItem = () => {
    const nextNum = itemsCount.length + 1;
    itemsCount.push(nextNum.toString())
    const newNumbersInNavbar = itemsCount.map((e) => ({
      value: e,
      label: e,
    }));

    const empty = {
      textContentPlaceholder: "Введите название секции",
      textContent: "",
      headerLocationPlaceholder: "Выберите расположение",
      headerLocation: "",
      footerLocationPlaceholder: "Выберите расположение",
      footerLocation: "",
      numberInNavbar: nextNum.toString(),
      sectionIdPlaceholder:
        "Если не выбрано, при нажатии откроется модальное окно обратной связи",
      sectionId: "",
    };
    const Enhanced = enhanceFormItem(FormItemNavbar, config);
    return (
      <Enhanced
        className={mainClassName}
        sectionsArr={sectionsLinkArr}
        sectionsNumbersInNavbar={newNumbersInNavbar}
        sourceObj={empty}
        key={Date.now()}
        isNew
      />
    );
  };

  useEffect(() => {
    const sectionsLinks = sectionsData
      .map((e) => ({
        value: e.name,
        label: e.name,
      }))
      .filter((e) => e.value !== undefined);
    
    const counts = navbarData.map(e => e.numberInNavbar);
    const firstNum = counts[0];
    const lastNum = counts[counts.length - 1];
    const arrOfNums = [];
    for (let i = firstNum; i <= lastNum; i++) {
      arrOfNums.push(i.toString());
    }

    const allNumbersInNavbar = arrOfNums.map((e) => ({
      value: e,
      label: e,
    }));

    const mapFormToRender = () => {
      return navbarData.map((item) => {
        const Enhanced = enhanceFormItem(FormItemNavbar, config);
        return (
          <Enhanced
            sourceObj={item}
            className={mainClassName}
            sectionsArr={sectionsLinks}
            sectionsNumbersInNavbar={allNumbersInNavbar}
            key={item._id}
          />
        );
      });
    };

    setItemsCount(arrOfNums);
    setSectionsLinkArr(sectionsLinks);
    setNavbarList(mapFormToRender());
  }, [navbarData, sectionsData]);

  const handleAddItem = () => {
    const form = createNewFormItem();
    const updated = navbarList.map((i) => i);
    updated.push(form);
    setNavbarList(updated);
  };

  return (
    <div className={mainClassName}>
      <SectionHeading
        className={`${mainClassName}__main-header`}
        text="Пункты меню"
      />
      <div className={`${mainClassName}__menu`}>{navbarList}</div>
      <Button
        className={`${mainClassName}__add-btn`}
        text="+"
        onClick={handleAddItem}
      />
    </div>
  );
};

export default FormContainerNavbar;
