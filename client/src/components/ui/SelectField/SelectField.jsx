import React from "react";
import styles from "./SelectField.module.css";
import cn from "classnames";

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

  const className = cn(styles.select_field, { ["error"]: error });

  return (
    <div className={className}>
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
      {error && <span className="error">{error}</span>}
    </div>
  );
};

export default SelectField;
