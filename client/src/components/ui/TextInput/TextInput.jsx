import React from "react";
import styles from "./TextInput.module.css";
import cn from "classnames";

const TextInput = ({
  label,
  name,
  type,
  value,
  onChange,
  error,
  placeholder,
  className,
  _id,
}) => {
  const handleChange = ({ target }) => {
    const value =
      type === "tel" ? target.value.replace(/[^\+\d]/g, "") : target.value;

    onChange({ name: target.name, value }, _id);
  };

  return (
    <div className={cn(className, styles.inp_container)}>
      <label htmlFor={name}>{label}</label>
      <input
        maxLength={type === "tel" ? "12" : ""}
        type={type || "text"}
        name={name}
        className={styles.input}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
      />
    </div>
  );
};

export default TextInput;
