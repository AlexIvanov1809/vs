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
  // зачем нижнее подчеркивание?
  _id,
}) => {
  const inpClassName = cn(className, styles.inp_container, {
    error, // вроде использовать укороченную запись
  });

  const handleChange = ({ target }) => {
    const value =
      type === "tel" ? target.value.replace(/[^+\d]/g, "") : target.value;

    onChange({ name: target.name, value }, _id);
  };

  return (
    <div className={inpClassName}>
      <label htmlFor={name}>{label}</label>
      <input
        // я бы предложил вынести 12 в пропсы
        maxLength={type === "tel" ? "12" : ""}
        type={type || "text"}
        name={name}
        className={styles.input}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
      />
      {error && <span className="error">{error}</span>}
    </div>
  );
};

export default TextInput;
