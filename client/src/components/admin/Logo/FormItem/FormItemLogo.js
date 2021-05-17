import React from "react";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import "./FormItemLogo.scss";
import AdminFormField from "../../AdminFormField/AdminFormField";

const logoSchema = yup.object().shape({
  iconSrc: yup
    .string("Введите текст")
    .strict(true)
    .typeError("Введите текст")
    .required("Обязательное поле"),
});

const FormItemLogo = ({ sourceObj, children, handleUpdate, className }) => {
  const { iconSrc } = sourceObj;

  return (
    <Formik
      initialValues={{ iconSrc }}
      validationSchema={logoSchema}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={handleUpdate}
    >
      {({ errors }) => (
        <Form className={`${className}__form-item`}>
          <AdminFormField
            labelClassName={`${className}__form-label`}
            fieldClassName={`${className}__form-input`}
            errorClassName={`${className}__form-error`}
            labelName="Путь к лого компании"
            type="input"
            name="iconSrc"
            placeholder={iconSrc}
            errors={errors}
          />
          {children}
          <Field
            type="submit"
            name="submit"
            className={`${className}__submit-btn`}
            value="Подтвердить изменения"
          />
        </Form>
      )}
    </Formik>
  );
};

export default FormItemLogo;
