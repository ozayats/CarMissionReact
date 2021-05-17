import React from "react";
import { Field, Form, Formik } from "formik";
import AdminFormField from "../../AdminFormField/AdminFormField";
import * as yup from "yup";
import axios from "axios";
import { toastr } from "react-redux-toastr";
import "./InviteForm.scss";

const inviteSchema = yup.object().shape({
  email: yup.string("Введите текст").email("Invalid email"),
});

const InviteForm = () => {
  const handleSubmit = async (values) => {
    const { email } = values;

    const res = await axios
      .post("/api/invites/", { email })
      .catch((err) => toastr.error(err.response.data.message));

    if (res.status === 200) {
      toastr.success("Success", res.data.message);
    } else {
      toastr.warning("Warning", "Something went wrong");
    }
  };

  return (
    <Formik
      initialValues={{ email: "" }}
      validationSchema={inviteSchema}
      validateOnBlur={false}
      validateOnChange={false}
      onSubmit={handleSubmit}
    >
      {({ errors }) => (
        <Form className="invite-form">
          <AdminFormField
            labelClassName="invite-form__label"
            fieldClassName="invite-form__input"
            errorClassName="invite-form__error"
            type="email"
            name="email"
            errors={errors}
            labelName="Email для приглашения"
          />
          <Field
            type="submit"
            name="submit"
            className="invite-form__submit-btn"
            value="Отправить приглашение"
          />
        </Form>
      )}
    </Formik>
  );
};

export default InviteForm;
