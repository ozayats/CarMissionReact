import React, { useState } from "react";
import "./Checkbox.scss";

const Checkbox = ({ name, setValue, labelText }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    setValue(name, isChecked);
  };

  return (
    <label className="checkbox">
      <input
        type="checkbox"
        checked={isChecked}
        className="checkbox__native"
        name={name}
        onChange={handleCheckboxChange}
      />
      <div className="checkbox__custom" />
      <span className="checkbox__text">{labelText}</span>
    </label>
  );
};

export default Checkbox;
