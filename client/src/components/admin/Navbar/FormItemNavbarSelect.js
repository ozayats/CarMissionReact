import React from "react";
import Select from "react-select";

const AdminNavbarSelect = ({
    onChange, options, value, className, placeholder, name, errors
}) => {
    const defaultValue = (options, value) => {
        return options ? options.find(option => option.value === value) : "";
    }
    const errorsKeys = errors !== undefined ? Object.keys(errors) : null;
    const notValidate = errors !== undefined ? errorsKeys.filter(e => e === name) : null;

    return (
      <div className={`${className}__select-block`}>
        <Select
            className={`${className}__select`}
            value={defaultValue(options, value)}
            placeholder={placeholder}
            onChange={value => {onChange(value)}}
            options={options}
            name={name}
            id={name}
        />
        {notValidate[0] === name &&
          (<div className={`${className}__form-error`}>
            Выберите один из вариантов
          </div>)
        }
      </div>
    );
};

export default AdminNavbarSelect;