import * as yup from "yup";

export const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required("Required field!")
    .min(3)
    .max(15, "Length err! String must contain 3-15 chars"),
  price: yup.number().required("Required field!"),
  currency: yup.string().required("Required field!"),
});
