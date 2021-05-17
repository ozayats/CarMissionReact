import React, { useState } from "react";
import { Field, Form, Formik } from "formik";
import AdminFormField from "../admin/AdminFormField/AdminFormField";
import * as yup from "yup";
import "./RegistrationForm.scss";
import axios from "axios";
import { toastr } from "react-redux-toastr";
import PropTypes from "prop-types";

const registrationSchema = yup.object().shape({
  firstName: yup
    .string("Введите текст")
    .typeError("Введите текст")
    .strict(true)
    .required("Обязательное поле"),
  lastName: yup
    .string("Введите текст")
    .typeError("Введите текст")
    .strict(true)
    .required("Обязательное поле"),
  login: yup
    .string("Введите текст")
    .typeError("Введите текст")
    .strict(true)
    .required("Обязательное поле"),
  password: yup
    .string("Введите текст")
    .typeError("Введите текст")
    .strict(true)
    .required("Обязательное поле"),
});

const initialValues = {
  firstName: "",
  lastName: "",
  login: "",
  password: "",
};

const RegistrationForm = ({ uuid, email }) => {
  const [submitSuccessfully, setSubmitSuccessfully] = useState(false);

  const handleSubmit = async (values) => {
    const dataToSend = {
      invite: {
        uuid,
        email,
      },
      user: {
        ...values,
      },
    };

    const res = await axios
      .post("/api/admin-users/", dataToSend)
      .catch((err) => toastr.error(err.response.data.message));

    if (res.status === 200) {
      setSubmitSuccessfully(true);
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={registrationSchema}
      validateOnBlur={false}
      validateOnChange={false}
      onSubmit={handleSubmit}
    >
      {({ errors, isSubmitting }) => (
        <Form className="registration-form">
          {submitSuccessfully ? (
            <p className="registration-successfully">
              Регистрация завершена! Подождите пока активируют Ваши права
              администратора
            </p>
          ) : (
            <>
              <AdminFormField
                labelClassName="registration-form__label"
                fieldClassName="registration-form__input"
                errorClassName="registration-form__error"
                type="text"
                name="firstName"
                errors={errors}
                labelName="Ваше имя"
              />
              <AdminFormField
                labelClassName="registration-form__label"
                fieldClassName="registration-form__input"
                errorClassName="registration-form__error"
                type="text"
                name="lastName"
                errors={errors}
                labelName="Ваша фамилия"
              />
              <AdminFormField
                labelClassName="registration-form__label"
                fieldClassName="registration-form__input"
                errorClassName="registration-form__error"
                type="text"
                name="login"
                errors={errors}
                labelName="Логин"
              />
              <AdminFormField
                labelClassName="registration-form__label"
                fieldClassName="registration-form__input"
                errorClassName="registration-form__error"
                type="password"
                name="password"
                errors={errors}
                labelName="Пароль"
              />
              <Field
                type="submit"
                name="submit"
                disabled={isSubmitting}
                className="button-callback"
                value="Зарегистрироваться"
              />
            </>
          )}
        </Form>
      )}
    </Formik>
  );
};

RegistrationForm.propTypes = {
  uuid: PropTypes.string,
  email: PropTypes.string,
};

export default RegistrationForm;
