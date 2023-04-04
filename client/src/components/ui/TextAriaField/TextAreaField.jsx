import React from "react";
import styles from "./TextAreaField.module.css";
import cn from "classnames";

const TextAreaField = ({ label, name, value, onChange, error }) => {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };
  const getInputClasses = () => {
    return "form-control" + (error ? " is-invalid" : "");
  };

  const className = cn(styles.text_container, { ["error"]: error });

  return (
    <div className={className}>
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

        {error && <span className="error">{error}</span>}
      </div>
    </div>
  );
};

export default TextAreaField;
