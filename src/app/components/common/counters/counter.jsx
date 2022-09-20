import React from "react";
import PropTypes from "prop-types";
import DeleteButton from "../buttons/deleteButton";

const Counter = ({ orderItems, onChange, onDelete }) => {
  const { _id: id, quantity, name, price, weight } = orderItems;

  return (
    <div>
      <span className="m-2 fw-bold">
        {name} {weight}
      </span>
      <button
        className="btn btn-white text-primary fs-6 btn-sm m-1"
        onClick={() => onChange(id, 1)}
      >
        <i className="bi bi-plus-lg"></i>
      </button>
      <span className="fs-6">{quantity}</span>

      <button
        className="btn btn-white text-primary fs-6 btn-sm m-1"
        onClick={() => (quantity > 1 ? onChange(id, -1) : onDelete(id))}
      >
        <i className="bi bi-dash-lg"></i>
      </button>
      <span className="me-2 fw-bold text-primary">
        {price * quantity} &#8381;
      </span>
      <DeleteButton onDelete={onDelete} id={id} />
    </div>
  );
};

Counter.propTypes = {
  orderItems: PropTypes.object,
  onDelete: PropTypes.func,
  onChange: PropTypes.func
};

export default Counter;
