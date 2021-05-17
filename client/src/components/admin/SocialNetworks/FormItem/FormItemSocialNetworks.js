import React from "react";
import { Formik, Form, Field } from "formik";
import AdminFormField from "../../AdminFormField/AdminFormField";
import * as yup from "yup";
import "./FormItemSocialNetworks.scss";
import PropTypes from "prop-types";

const socialNetworksSchema = yup.object().shape({
  name: yup
    .string("Введите текст")
    .strict(true)
    .typeError("Введите текст")
    .required("Обязательное поле"),
  url: yup
    .string("Введите текст")
    .strict(true)
    .typeError("Введите текст")
    .required("Обязательное поле"),
});

const FormItemSocialNetworks = ({
  sourceObj,
  isNew,
  children,
  handleUpdate,
  handlePost,
  className,
}) => {
  const {
    isEnabled,
    name,
    url,
    iconSrc,
    namePlaceholder,
    urlPlaceholder,
    iconSrcPlaceholder,
  } = sourceObj;

  return (
    <Formik
      initialValues={{ name, url, iconSrc, isEnabled: isEnabled }}
      validationSchema={socialNetworksSchema}
      validateOnBlur={false}
      validateOnChange={false}
      onSubmit={isNew ? handlePost : handleUpdate}
    >
      {({ errors, values }) => (
        <Form className={`${className}__form-item`}>
          <AdminFormField
            labelName="Cоцсеть"
            name="name"
            type="text"
            labelClassName={`${className}__form-label`}
            fieldClassName={`${className}__form-input`}
            errorClassName={`${className}__form-error`}
            placeholder={name || namePlaceholder}
            errors={errors}
          />
          <AdminFormField
            labelName="Ссылка на аккаунт"
            name="url"
            type="text"
            labelClassName={`${className}__form-label`}
            fieldClassName={`${className}__form-input`}
            errorClassName={`${className}__form-error`}
            placeholder={url || urlPlaceholder}
            errors={errors}
          />
          <AdminFormField
            labelName="Ссылка на иконку"
            name="iconSrc"
            type="text"
            labelClassName={`${className}__form-label`}
            fieldClassName={`${className}__form-input`}
            errorClassName={`${className}__form-error`}
            errors={errors}
            placeholder={iconSrc || iconSrcPlaceholder}
          />

          <label className={`${className}__form-label`}>
            Отображение соцсети на сайте
          </label>
          <div className={`${className}__form-toggle`}>
            <Field
              className={`${className}__form-field`}
              type="checkbox"
              name="isEnabled"
            />
            {values.isEnabled ? (
              <span className={`${className}__active`}>Активна на сайте</span>
            ) : (
              <span className={`${className}__none-active`}>
                Неактивна на сайте
              </span>
            )}
          </div>
          {children}

          <Field
            type="submit"
            name="submit"
            className={`${className}__submit-btn`}
            value={isNew ? "Создать новую соц-сеть?" : "Подтвердить изменения"}
          />
        </Form>
      )}
    </Formik>
  );
};

FormItemSocialNetworks.propTypes = {
  className: PropTypes.string,
  sourceObj: PropTypes.object,
  isNew: PropTypes.bool,
  // children,
  // put,
  // post,
  // uploadToS3,
  // file,
};

FormItemSocialNetworks.defaultTypes = {
  isNew: false,
  className: "",
  sourceObj: {},
  // children,
  // put,
  // post,
  // uploadToS3,
  // file,
};

export default FormItemSocialNetworks;
