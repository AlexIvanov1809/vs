import React, { useState } from "react";
import Counter from "./counter";
import PropTypes from "prop-types";

const CountersList = ({ orderItems }) => {
  const [counters, setCounters] = useState(orderItems);

  const handleDelete = (id) => {
    const newCounters = counters.filter((c) => c.id !== id);
    setCounters(newCounters);
  };

  const handleReset = () => {
    setCounters([]);
  };

  const handleIncrement = (id) => {
    const updatedValue = counters.map((c) => {
      if (c.id === id) {
        c.quantity += 1;
      }
      return c;
    });
    setCounters(updatedValue);
  };

  const handleDecrement = (id) => {
    const updatedValue = counters.map((c) => {
      if (c.id === id) {
        c.quantity -= 1;
      }
      return c;
    });
    setCounters(updatedValue);
  };

  return (
    <>
      {counters.map((count) => (
        <Counter
          key={count.id}
          onDelete={handleDelete}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
          orderItems={count}
        />
      ))}
      <button className="btn btn-primary btn-sm m-2" onClick={handleReset}>
        Reset
      </button>
    </>
  );
};

CountersList.propTypes = {
  orderItems: PropTypes.array
};

export default CountersList;
