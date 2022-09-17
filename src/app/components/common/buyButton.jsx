import React, { useState } from "react";

const BuyButton = () => {
  let [quantity, setQuantity] = useState(1);
  const handleChange = (znak) => {
    if (znak === "+") {
      setQuantity(quantity++);
    } else {
      setQuantity(quantity--);
    }
  };
  return (
    <div>
      <div className="d-flex align-items-center justify-content-center ">
        <span
          className="fs-2"
          role="button"
          onClick={quantity > 1 ? () => handleChange("-") : () => {}}
        >
          -
        </span>
        <span className="mx-3 fs-2">{quantity}</span>
        <span className="fs-2" role="button" onClick={() => handleChange("+")}>
          +
        </span>
      </div>
      <button className="btn btn-primary">Добавить</button>
    </div>
  );
};

export default BuyButton;
