import React from "react";
import PropTypes from "prop-types";

const Counter = ({ orderItems, onIncrement, onDecrement, onDelete }) => {
  const { id, quantity, country, sort, price } = orderItems;

  const formatValue = () => {
    return quantity === 0 ? "empty" : quantity;
  };

  const getBageClasses = () => {
    let classes = "badge m-2 ";
    classes += quantity === 0 ? "bg-warning" : "bg-primary";
    return classes;
  };

  return (
    <div>
      <span className="m-2">
        {country} {sort}
      </span>
      <span>{price * quantity}</span>
      <span className={getBageClasses()}>{formatValue()}</span>
      <button
        className="btn btn-primary btn-sm m-2"
        onClick={() => onIncrement(id)}
      >
        +
      </button>
      <button
        className="btn btn-primary btn-sm m-2"
        onClick={() => (quantity > 1 ? onDecrement(id) : onDelete(id))}
      >
        -
      </button>
      <button
        className="btn btn-danger btn-sm m-2"
        onClick={() => onDelete(id)}
      >
        Delete
      </button>
    </div>
  );
};

Counter.propTypes = {
  orderItems: PropTypes.object,
  onDelete: PropTypes.func,
  onDecrement: PropTypes.func,
  onIncrement: PropTypes.func
};

export default Counter;
