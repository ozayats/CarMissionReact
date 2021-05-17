import React from "react";
import { Formik, Form, Field } from "formik";
import AdminFormField from "../../AdminFormField/AdminFormField";
import "./FormItemServicePackages.scss";
import AdminServiceList from "../AdminServiceList/AdminServiceList";

const FormItemServicePackages = ({
  sourceObj,
  isNew,
  children,
  handleUpdate,
  handlePost,
}) => {
  const { name, price, currency, serviceList } = sourceObj;

  return (
    <Formik
      initialValues={{ name, price, currency, serviceList }}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={isNew ? handlePost : handleUpdate}
    >
      {({ errors, isSubmitting, values }) => (
        <Form className="admin-packages__form-item">
          <AdminFormField
            labelClassName="admin-packages__form-label"
            fieldClassName="admin-packages__form-input"
            errorClassName="admin-packages__form-error"
            type="input"
            name="name"
            errors={errors}
            labelName="Название Пакета услуг"
          />
          <AdminFormField
            labelClassName="admin-packages__form-label"
            fieldClassName="admin-packages__form-input"
            errorClassName="admin-packages__form-error"
            type="input"
            name="price"
            errors={errors}
            labelName="Цена Пакета"
          />
          <AdminFormField
            labelClassName="admin-packages__form-label"
            fieldClassName="admin-packages__form-input"
            errorClassName="admin-packages__form-error"
            type="input"
            name="currency"
            errors={errors}
            labelName="Валюта"
          />
          <AdminServiceList errors={errors} values={values} />
          {children}
          <Field
            type="submit"
            name="submit"
            className="admin-packages__submit-btn"
            disabled={isSubmitting}
            value={isNew ? "Создать пакет услуг" : "Подтвердить изменения"}
          />
        </Form>
      )}
    </Formik>
  );
};

export default FormItemServicePackages;
