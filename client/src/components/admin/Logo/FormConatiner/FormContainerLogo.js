import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getLogoData } from "../../../../store/logo/selectors";
import enhanceFormItem from "../../../../components/hoc/enhanceFromItem";
import FormItemLogo from "../FormItem/FormItemLogo";
import SectionHeading from "../../../generalComponents/SectionHeading/SectionHeading";
import "./FormContainerLogo.scss";
import { updateLogoImgSrc } from "../../../../store/logo/operations";

const config = {
  dropZone: true,
  pathProp: "iconSrc",
  routes: {
    post: "/api/logo/",
    put: "/api/logo/",
    upload: "/api/logo/upload/",
  },
  actions: {
    updateS3Link: updateLogoImgSrc,
    updateInRedux: updateLogoImgSrc,
  },
};

const FormContainerLogo = () => {
  const [logoRender, setLogoRender] = useState();
  const data = useSelector(getLogoData);
  const mainClassName = "admin-logo";

  useEffect(() => {
    const formToRender = () => {
      const Enhanced = enhanceFormItem(FormItemLogo, config);
      return <Enhanced sourceObj={data} className={mainClassName} />;
    };
    setLogoRender(formToRender);
  }, [data]);

  return (
    <div className={mainClassName}>
      <SectionHeading
        className={`${mainClassName}__main-header`}
        text="Главное Лого"
      />
      {logoRender}
    </div>
  );
};

export default FormContainerLogo;
