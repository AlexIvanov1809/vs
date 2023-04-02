import React from "react";
import styles from "./TextAreaField.module.css";

const TextAreaField = ({ label, name, value, onChange, error }) => {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };
  const getInputClasses = () => {
    return "form-control" + (error ? " is-invalid" : "");
  };

  return (
    <div className={styles.text_container}>
      <label htmlFor={name}> {label}</label>
      <div className={styles.text_item}>
        <textarea
          rows="5"
          id={name}
          name={name}
          value={value || ""}
          onChange={handleChange}
          className={getInputClasses()}
        />

        {error && <div className="invalid-feedback ">{error}</div>}
      </div>
    </div>
  );
};

export default TextAreaField;
