import React from "react";
import PropTypes from "prop-types";

const TextForm = ({ label, name, type, onChange }) => {
  return (
    <div className="md-4">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <div className="input-group has-validation">
        <input
          type={type}
          name={name}
          className="form-control is-invalid"
          id={name}
          onChange={onChange}
        />
        <div id="validationServerUsernameFeedback" className="invalid-feedback">
          Please choose a E-mail.
        </div>
      </div>
    </div>
  );
};
TextForm.defaultProps = {
  type: "text"
};
TextForm.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  // value: PropTypes.string,
  // error: PropTypes.string,
  onChange: PropTypes.func
};

export default TextForm;
