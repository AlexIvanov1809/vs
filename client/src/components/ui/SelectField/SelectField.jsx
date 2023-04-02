import React from "react";
import styles from "./SelectField.module.css";

const SelectField = ({
  label,
  value,
  onChange,
  defaultOption,
  options,
  error,
  name,
  _id,
}) => {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value }, _id);
  };

  return (
    <div className={styles.select_field}>
      <label htmlFor={name} className={styles.select_label}>
        {label}
      </label>
      <div>
        <select
          className={styles.select_tag}
          id={name}
          name={name}
          value={value || ""}
          onChange={handleChange}
        >
          <option value={defaultOption} disabled={defaultOption === ""}>
            {defaultOption}
          </option>
          {options &&
            options.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
        </select>
      </div>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default SelectField;
