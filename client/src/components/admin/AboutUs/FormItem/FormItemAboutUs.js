import React from "react";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import "./FormItemAboutUs.scss";
import AdminFormField from "../../AdminFormField/AdminFormField";

const validationSchemaCreator = (inputName) => {
  return yup.object().shape({
    imgPath: yup.string(),
    [inputName]: yup
      .string()
      .required("Обязательное поле!")
      .min(15)
      .max(600, "Ошибка длины! Строка должна содержать 15-600 знаков"),
  });
};

const FormItemAboutUs = ({
  sourceObj,
  isNew,
  children,
  handlePost,
  handleUpdate,
}) => {
  const { imgPath, title, text, isMain } = sourceObj;

  return (
    <Formik
      initialValues={isMain ? { imgPath, text } : { imgPath, title }}
      validationSchema={validationSchemaCreator(isMain ? "text" : "title")}
      validateOnBlur={false}
      validateOnChange={false}
      onSubmit={isNew ? handlePost : handleUpdate}
    >
      {({ errors }) => (
        <Form
          className={
            isMain
              ? "admin-about-us__form-main-item"
              : "admin-about-us__form-item"
          }
        >
          <AdminFormField
            labelClassName="admin-about-us__form-label"
            fieldClassName="admin-about-us__form-input"
            errorClassName="admin-about-us__form-error"
            name="imgPath"
            errors={errors}
            labelName="Путь к картинке"
          />
          <AdminFormField
            labelClassName="admin-about-us__form-label"
            fieldClassName={
              isMain
                ? "admin-about-us__form-textarea"
                : "admin-about-us__form-input"
            }
            errorClassName="admin-about-us__form-error"
            as={isMain ? "textarea" : "input"}
            name={isMain ? "text" : "title"}
            errors={errors}
            labelName={isMain ? "Текстовый контент" : "Подпись к картинке"}
          />
          {children}
          <Field
            type="submit"
            name="submit"
            className="admin-about-us__submit-btn"
            value={isNew ? "Создать преимущество" : "Подтвердить изменения"}
          />
        </Form>
      )}
    </Formik>
  );
};

export default FormItemAboutUs;
