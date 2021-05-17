import React from "react";
import AdminFormField from "../../../AdminFormField/AdminFormField";

const PassFields = ({ errors }) => {
  return (
    <>
      <AdminFormField
        labelClassName="dropdown-form__label"
        fieldClassName="dropdown-form__input"
        errorClassName="dropdown-form__error"
        type="password"
        name="password"
        errors={errors}
        labelName="Старый пароль"
      />
      <AdminFormField
        labelClassName="dropdown-form__label"
        fieldClassName="dropdown-form__input"
        errorClassName="dropdown-form__error"
        type="password"
        name="newPassword"
        errors={errors}
        labelName="Новый пароль"
      />
      <AdminFormField
        labelClassName="dropdown-form__label"
        fieldClassName="dropdown-form__input"
        errorClassName="dropdown-form__error"
        type="password"
        name="confirmPassword"
        errors={errors}
        labelName="Повторите новый пароль"
      />
    </>
  );
};

export default PassFields;
