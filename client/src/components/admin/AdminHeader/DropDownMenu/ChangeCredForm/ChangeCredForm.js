import React, { useState } from "react";
import { Field, Form, Formik } from "formik";
import Button from "../../../../generalComponents/Button/Button";
import "./ChangeCredForm.scss";
import axios from "axios";
import { toastr } from "react-redux-toastr";
import LoginFields from "../LoginFields/LoginFields";
import PassFields from "../PassFields/PassFields";
import { loginSchema, passwordSchema } from "./validationSchemas";
import { loginValues, passwordValues } from "./initialValues";

const ChangeCredForm = ({ id, isLogin, isPass, setLogin }) => {
  const [isChange, setIsChange] = useState(false);

  const getBtnText = () => {
    if (isLogin) {
      return {
        trigger: "Изменить логин",
        submit: "Подтвердить смену логина",
      };
    } else if (isPass) {
      return {
        trigger: "Изменить пароль",
        submit: "Подтвердить смену пароля",
      };
    } else {
      return {
        trigger: "Изменить",
        submit: "Подтвердить смену",
      };
    }
  };

  const getValidationSchema = () => {
    if (isLogin) {
      return loginSchema;
    } else if (isPass) {
      return passwordSchema;
    }
  };

  const getInitialValues = () => {
    if (isLogin) {
      return loginValues;
    } else if (isPass) {
      return passwordValues;
    }
  };

  const getRequest = (values) => {
    if (isLogin) {
      return axios
        .put(`/api/admin-users/${id}`, values)
        .catch((err) => toastr.error(err.response.data.message));
    } else if (isPass) {
      const { password, newPassword } = values;
      const toSend = { password, newPassword };
      return axios
        .put(`/api/admin-users/password/${id}`, toSend)
        .catch((err) => toastr.error(err.response.data.message));
    }
  };

  const triggerChange = (e) => {
    e.preventDefault();
    setIsChange(true);
  };

  const handlePassChange = async (values) => {
    const res = await getRequest(values);

    if (res.status === 200) {
      if (isPass) {
        toastr.success("Успешно", "Пароль изменён");
      } else if (isLogin) {
        setLogin(res.data.login);
        toastr.success("Успешно", "Логин изменён");
      }
      setIsChange(false);
    } else {
      toastr.warning("", "Что-то пошло не так");
    }
  };

  return (
    <Formik
      initialValues={getInitialValues()}
      validationSchema={getValidationSchema()}
      validateOnBlur={false}
      validateOnChange={false}
      onSubmit={handlePassChange}
    >
      {({ errors, touched }) => (
        <Form className="dropdown-form">
          {isChange && isLogin && <LoginFields errors={errors} />}
          {isChange && isPass && <PassFields errors={errors} />}
          {isChange ? (
            <Field
              type="submit"
              name="submit"
              className="dropdown-wrap__btn"
              value={getBtnText().submit}
            />
          ) : (
            <Button
              text={getBtnText().trigger}
              className="dropdown-wrap__btn"
              onClick={triggerChange}
            />
          )}
        </Form>
      )}
    </Formik>
  );
};

export default ChangeCredForm;
