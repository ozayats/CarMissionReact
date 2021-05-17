import React from "react";
import { Form, Formik, Field } from "formik";
import "./LoginPage.scss";
import * as yup from "yup";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setIsAuth } from "../../store/auth/actions";
import { toastr } from "react-redux-toastr";
import { decodeUser } from "../../utils/functions/decodeUser";

const initialValues = {
  login: "",
  password: "",
};

const loginSchema = yup.object().shape({
  login: yup.string().required("This is required field"),
  password: yup.string().required("This is required field"),
});

const LoginPage = () => {
  const dispatch = useDispatch();

  const loginSubmit = async (values) => {
    const res = await axios
      .post("/api/admin-users/login", { ...values })
      .catch((err) => {
        toastr.error(err.response.data.message);
      });

    if (res.data.success) {
      const { isAdmin } = decodeUser(res.data.token);
      if (isAdmin) {
        localStorage.setItem("token", res.data.token);
        axios.defaults.headers.common.Authorization = res.data.token;
        dispatch(setIsAuth(true));
      } else {
        toastr.warning("Предупреждение", "Недостаточно прав");
      }
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={loginSubmit}
      validationSchema={loginSchema}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({ errors }) => (
        <div className="login">
          <Form className="login__form">
            <h3 className="login__head">Авторизация</h3>
            <Field
              className="login__field"
              name="login"
              placeholder="Введите логин"
            />
            <Field
              className="login__field"
              type="password"
              name="password"
              placeholder="Введите пароль"
            />
            <Field
              className="login__submit"
              type="submit"
              name="submit"
              value="Войти"
            />
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default LoginPage;
