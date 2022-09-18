import React, { useState } from "react";
import PropTypes from "prop-types";

const BuyButton = ({ onChange }) => {
  const [quantity, setQuantity] = useState(1);
  const handleChange = (counter) => {
    setQuantity(quantity + counter);
  };

  const handleSubmit = (qty) => {
    onChange(qty);
  };

  return (
    <div>
      <div className="d-flex align-items-center justify-content-center ">
        <button
          className="btn btn-white text-primary fs-5"
          role="button"
          onClick={quantity > 1 ? () => handleChange(-1) : () => {}}
        >
          <i className="bi bi-dash-lg"></i>
        </button>
        <span className="mx-1 fs-2">{quantity}</span>
        <button
          className="btn btn-white text-primary fs-5"
          role="button"
          onClick={() => handleChange(1)}
        >
          <i className="bi bi-plus-lg"></i>
        </button>
      </div>
      <button
        onClick={() => handleSubmit(quantity)}
        className="btn btn-primary"
      >
        Добавить
      </button>
    </div>
  );
};

BuyButton.propTypes = {
  onChange: PropTypes.func
};

export default BuyButton;
