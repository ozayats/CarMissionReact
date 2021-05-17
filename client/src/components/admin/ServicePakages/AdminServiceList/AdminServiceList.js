import React from "react";
import AdminFormField from "../../AdminFormField/AdminFormField";
import Button from "../../../generalComponents/Button/Button";
import { FieldArray } from "formik";

const AdminServiceList = ({ errors, values }) => {
  return (
    <FieldArray
      name="serviceList"
      render={(arrayHelpers) => (
        <ul className="admin-packages__list-container">
          {values.serviceList && values.serviceList.length > 0 ? (
            values.serviceList.map((option, index) => (
              <li key={index} className="admin-packages__list-item">
                <AdminFormField
                  name={`serviceList.${index}`}
                  labelClassName="admin-packages__form-label"
                  fieldClassName="admin-packages__form-input"
                  errorClassName="admin-packages__form-error"
                  errors={errors}
                  labelName={`Услуга №${index + 1}`}
                />
                <Button
                  className="admin-packages__remove-option"
                  text="Удалить"
                  onClick={(e) => {
                    e.preventDefault();
                    arrayHelpers.remove(index);
                  }}
                />
                <Button
                  text="Добавить"
                  className="admin-packages__add-option"
                  onClick={(e) => {
                    e.preventDefault();
                    arrayHelpers.insert(index + 1, "");
                  }}
                />
              </li>
            ))
          ) : (
            <Button
              text="Создать список услуг"
              className="admin-packages__add-list"
              onClick={(e) => {
                e.preventDefault();
                arrayHelpers.push("");
              }}
            />
          )}
        </ul>
      )}
    />
  );
};

export default AdminServiceList;
