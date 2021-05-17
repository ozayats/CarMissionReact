import * as yup from "yup";

export const passwordSchema = yup.object().shape({
  password: yup.string().required("Обязательное поле"),
  newPassword: yup
    .string()
    .min(6, "Больше 6 символов")
    .required("Обязательное поле"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Пароли должны совпадать")
    .required("Обязательное поле"),
});

export const loginSchema = yup.object().shape({
  login: yup.string().min(4, "Больше 4 символов").required("Обязательное поле"),
});
