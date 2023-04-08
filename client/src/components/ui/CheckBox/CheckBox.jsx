import React from "react";
import styles from "./CheckBox.module.css";

const CheckBox = ({ name, value, onChange, children, error }) => {
  const handleChange = () => {
    onChange({ name, value: !value });
  };
  // зачем функция? почему не просто переменная?
  const getInputClasses = () => {
    return "form-check-input" + (error ? " is-invalid" : "");
  };
  return (
    <div className={styles.checkbox_container}>
      <input
        className={getInputClasses()}
        type="checkbox"
        value={value}
        id={name}
        onChange={handleChange}
        checked={value}
        role="button"
      />
      <label
        className={styles.checkbox_label}
        htmlFor="flexCheckDefault"
        onClick={handleChange}
        role="button"
      >
        {children}
      </label>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default CheckBox;
