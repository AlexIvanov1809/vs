import React from "react";
import PropTypes from "prop-types";

const CheckBoxField = ({ named, value, onChange, children, error }) => {
  const handleChange = () => {
    onChange({ name: named, value: !value });
  };
  const getInputClasses = () => {
    return "form-check-input" + (error ? " is-invalid" : "");
  };
  return (
    <div className="form-check mb-4">
      <input
        className={getInputClasses()}
        type="checkbox"
        value=""
        id={named}
        onChange={handleChange}
        checked={value}
      />
      <label className="form-check-label" htmlFor="flexCheckDefault">
        {children}
      </label>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

CheckBoxField.propTypes = {
  named: PropTypes.string,
  value: PropTypes.bool,
  onChange: PropTypes.func,
  error: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default CheckBoxField;
