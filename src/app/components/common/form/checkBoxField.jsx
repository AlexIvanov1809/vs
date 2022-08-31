import React, { useState } from "react";

const CheckBoxField = ({ label }) => {
  const [checked, setChecked] = useState(false);

  const handleCheck = () => {
    setChecked(!checked);
  };
  return (
    <div className="form-check">
      <input
        className="form-check-input"
        type="checkbox"
        value=""
        id="flexCheckChecked"
        onChange={handleCheck}
        checked={checked}
      />
      <label className="form-check-label" htmlFor="flexCheckChecked">
        {label}
      </label>
    </div>
  );
};

export default CheckBoxField;
