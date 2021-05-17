import React from "react";
import { Formik, Form, Field } from "formik";
import "./FormItemWorkStages.scss";
import * as yup from "yup";
import AdminFormField from "../../AdminFormField/AdminFormField";

const workStagesSchema = yup.object().shape({
  num: yup
    .number()
    .typeError("Введите число")
    .positive("Отрицательный шаг? Серьёзно?")
    .integer("Введите целое число")
    .required("Обязательное поле"),
  name: yup
    .string()
    .typeError("Введите текст")
    .strict(true)
    .required("Обязательное поле"),
  iconSrc: yup.string("Введите текст").typeError("Введите текст").strict(true),
});

const FormItemWorkStages = ({
  sourceObj,
  isNew,
  children,
  handlePost,
  handleUpdate,
}) => {
  const { num, name, iconSrc } = sourceObj;

  return (
    <Formik
      initialValues={{ num, name, iconSrc }}
      validationSchema={workStagesSchema}
      validateOnBlur={false}
      validateOnChange={false}
      onSubmit={isNew ? handlePost : handleUpdate}
    >
      {({ errors }) => (
        <Form className="admin-stages__form-item">
          <AdminFormField
            labelClassName="admin-stages__form-label"
            fieldClassName="admin-stages__form-input"
            errorClassName="admin-stages__form-error"
            name="num"
            errors={errors}
            labelName="Номер этапа"
          />
          <AdminFormField
            labelClassName="admin-stages__form-label"
            fieldClassName="admin-stages__form-input"
            errorClassName="admin-stages__form-error"
            name="name"
            errors={errors}
            labelName="Название этапа"
          />
          <AdminFormField
            labelClassName="admin-stages__form-label"
            fieldClassName="admin-stages__form-input"
            errorClassName="admin-stages__form-error"
            name="iconSrc"
            errors={errors}
            labelName="Ссылка на иконку шага"
          />
          {children}
          <Field
            type="submit"
            name="submit"
            className="admin-stages__submit-btn"
            value={isNew ? "Создать этап" : "Подтвердить изменения"}
          />
        </Form>
      )}
    </Formik>
  );
};

export default FormItemWorkStages;
