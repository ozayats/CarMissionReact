import React from "react";
import { Formik, Form, Field } from "formik";
import AdminFormField from "../../AdminFormField/AdminFormField";
import { validationSchema } from "../ValidationSchema";
import "./FormItemReviewCarousel.scss";

const FormItemReviewCarousel = ({
  sourceObj,
  isNew,
  children,
  handlePost,
  handleUpdate,
}) => {
  const { customerPhoto, customerName, carInfo, reviewText } = sourceObj;

  return (
    <Formik
      initialValues={{ customerPhoto, customerName, carInfo, reviewText }}
      validationSchema={validationSchema}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={isNew ? handlePost : handleUpdate}
    >
      {({ errors, isSubmitting }) => (
        <Form className="admin-reviews__form-item" noValidate>
          <AdminFormField
            labelClassName="admin-reviews__form-label"
            fieldClassName="admin-reviews__form-input"
            errorClassName="admin-reviews__form-error"
            type="text"
            name="customerPhoto"
            errors={errors}
            labelName="Путь к фото"
          />
          <AdminFormField
            labelClassName="admin-reviews__form-label"
            fieldClassName="admin-reviews__form-input"
            errorClassName="admin-reviews__form-error"
            type="text"
            name="customerName"
            errors={errors}
            labelName="Имя покупателя"
          />
          <AdminFormField
            labelClassName="admin-reviews__form-label"
            fieldClassName="admin-reviews__form-input"
            errorClassName="admin-reviews__form-error"
            type="text"
            name="carInfo"
            errors={errors}
            labelName="Марка, модель авто"
          />
          <AdminFormField
            as="textarea"
            labelClassName="admin-reviews__form-label"
            fieldClassName="admin-reviews__form-textarea"
            errorClassName="admin-reviews__form-error"
            type="textarea"
            name="reviewText"
            errors={errors}
            labelName="Отзыв"
          />
          {children}
          <Field
            disabled={isSubmitting}
            type="submit"
            name="submit"
            className="admin-reviews__submit-btn"
            value={isNew ? "Создать отзыв" : "Подтвердить изменения"}
          />
        </Form>
      )}
    </Formik>
  );
};

export default FormItemReviewCarousel;
