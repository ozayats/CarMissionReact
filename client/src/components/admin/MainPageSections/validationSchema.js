import * as yup from "yup";

export const validationSchema = yup.object().shape({
  heading: yup
    .string()
    .min(2, "Length err! String must contain 15-50 chars")
    .max(50, "Length err! String must contain 15-50 chars")
    .required("Required field!"),
  description: yup
    .string()
    .min(15, "Length err! String must contain 15-50 chars")
    .max(600, "Length err! String must contain 15-600 chars"),
  index: yup
    .number()
    .required("Required field!"),
  disabled: yup.boolean().required("Required field!"),
});
