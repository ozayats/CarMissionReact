import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import AdminFormField from "../../AdminFormField/AdminFormField";
import { validationSchema } from "../ValidationSchema";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./FormItemBlogs.scss";
import { Editor } from "@tinymce/tinymce-react";

const FormItemBlogs = ({
  sourceObj,
  isNew,
  children,
  handlePost,
  handleUpdate,
}) => {
  const { photo, title, text, fullText, buttonText, date } = sourceObj;
  const [blogText, setBlogText] = useState(fullText);

  const submitItem = (values) => {
    const {blogDate, ...rest} = values;

    rest.fullText = blogText;
    rest.date = blogDate.getTime();

    isNew ? handlePost(rest) : handleUpdate(rest);
  }

  return (
    <Formik
      initialValues={{ photo, title, text, fullText, buttonText, blogDate: isNew ? new Date() : new Date(+date) }}
      validationSchema={validationSchema}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={submitItem}
    >
      {({ errors, isSubmitting, setFieldValue, values }) => (
        <Form className="admin-blogs__form-item" noValidate>
          <AdminFormField
            labelClassName="admin-blogs__form-label"
            fieldClassName="admin-blogs__form-input"
            errorClassName="admin-blogs__form-error"
            type="text"
            name="photo"
            errors={errors}
            labelName="Путь к фото"
          />
          <AdminFormField
            labelClassName="admin-blogs__form-label"
            fieldClassName="admin-blogs__form-input"
            errorClassName="admin-blogs__form-error"
            type="text"
            name="title"
            errors={errors}
            labelName="Заголовок блога"
          />
          <AdminFormField
            as="textarea"
            labelClassName="admin-blogs__form-label"
            fieldClassName="admin-blogs__form-textarea"
            errorClassName="admin-blogs__form-error"
            type="textarea"
            name="text"
            errors={errors}
            labelName="Краткое описание блога"
          />
          <AdminFormField
            as={Editor}
            labelClassName="admin-blogs__form-label"
            errorClassName="admin-blogs__form-error"
            type="text"
            name="fullText"
            errors={errors}
            labelName="Полный текст блога"
            apiKey="nd49ra86ih41ltzuer5300ddq50zkffzx917inp5k032md2m"
            value={fullText}
            onEditorChange={(val) => setBlogText(val)}
            textareaName="fullText"
          />
          <AdminFormField
            labelClassName="admin-blogs__form-label"
            fieldClassName="admin-blogs__form-input"
            errorClassName="admin-blogs__form-error"
            type="text"
            name="buttonText"
            errors={errors}
            labelName="Текст на кнопке"
          />
          <AdminFormField
            as={DatePicker}
            labelClassName="admin-blogs__form-label"
            fieldClassName="admin-blogs__form-textarea"
            errorClassName="admin-blogs__form-error"
            type="text"
            errors={errors}
            labelName="Дата блога"
            selected={values.blogDate}
            dateFormat="dd.MM.yyyy"
            className="admin-blogs__form-date"
            name="blogDate"
            onChange={date => setFieldValue("blogDate", date)}
          />
          {children}
          <Field
            disabled={isSubmitting}
            type="submit"
            name="submit"
            className="admin-blogs__submit-btn"
            value={isNew ? "Создать блог" : "Подтвердить изменения"}
          />
        </Form>
      )}
    </Formik>
  );
};

export default FormItemBlogs;
