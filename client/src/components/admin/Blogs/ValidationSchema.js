import * as yup from "yup";

export const validationSchema = yup.object().shape({
  // photo: yup
  //   .string("Введите текст")
  //   .typeError("Введите текст")
  //   .strict(true)
  //   .required("Обязательное поле"),
  title: yup
    .string("Введите текст")
    .typeError("Введите текст")
    .strict(true)
    .required("Обязательное поле"),
  text: yup
    .string("Введите текст")
    .typeError("Введите текст")
    .strict(true)
    .required("Обязательное поле"),
  fullText: yup
    .string("Введите текст")
    .typeError("Введите текст")
    .strict(true)
    .required("Обязательное поле"),
  buttonText: yup
    .string("Введите текст")
    .typeError("Введите текст")
    .strict(true)
    .required("Обязательное поле"),
  // date: yup
  //   .string("Введите текст")
  //   .typeError("Введите текст")
  //   .strict(true)
  //   .required("Обязательное поле"),
});
