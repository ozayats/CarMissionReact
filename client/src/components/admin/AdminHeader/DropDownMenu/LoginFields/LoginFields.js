import React from "react";
import AdminFormField from "../../../AdminFormField/AdminFormField";

const LoginFields = ({ errors }) => {
  return (
    <AdminFormField
      labelClassName="dropdown-form__label"
      fieldClassName="dropdown-form__input"
      errorClassName="dropdown-form__error"
      type="text"
      name="login"
      errors={errors}
      labelName="Новый логин"
    />
  );
};

export default LoginFields;
