import React from "react";
import PropTypes from "prop-types";
import DeleteButton from "../buttons/deleteButton";

const Counter = ({ orderItems, onChange, onDelete }) => {
  const { _id: id, quantity, name, price, weight, beans, brand } = orderItems;

  return (
    <li key={id} className="pe-2">
      <div className="w-100 d-flex justify-content-between align-items-start">
        <div className="mt-2 fw-bold ">
          <span className="text-danger">{brand}</span>{" "}
        </div>
        <div className="m-2">
          <span className="text-primary">{name}</span> <div>{beans}</div>
        </div>
        <div className="mx-2 text-center">
          <button
            className="btn btn-white text-primary fs-6 btn-sm m-1"
            onClick={() => onChange(id, 1)}
          >
            <i className="bi bi-plus-lg"></i>
          </button>
          <span className="fs-6">{quantity}</span>

          <button
            className="btn btn-white text-danger fs-6 btn-sm m-1"
            onClick={() => (quantity > 1 ? onChange(id, -1) : onDelete(id))}
          >
            <i className="bi bi-dash-lg"></i>
          </button>
          <div className="fw-bold">
            <span>1 шт. {price} &#8381;</span>
          </div>
          <div>{weight}</div>
        </div>
        <div>
          <div className="mt-2">
            <span className="me-2 fw-bold text-primary">
              {price * quantity} &#8381;
            </span>
          </div>
          <DeleteButton onDelete={onDelete} itemId={id} />
        </div>
      </div>
      <div className="w-100">
      </div>
        <hr />
    </li>
  );
};

Counter.propTypes = {
  orderItems: PropTypes.object,
  onDelete: PropTypes.func,
  onChange: PropTypes.func
};

export default Counter;
