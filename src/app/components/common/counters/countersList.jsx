import React, { useEffect, useState } from "react";
import Counter from "./counter";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteItem,
  editItemBasket,
  getStore,
  resetBasket
} from "../../../store/consumerBasket";

const CountersList = () => {
  const dispatch = useDispatch();
  const orderItems = useSelector(getStore());
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState();
  useEffect(() => {
    setItems(orderItems);
  }, [orderItems]);

  useEffect(() => {
    const allItemsList = [];
    orderItems.forEach((i) => {
      const itemPrice = i.quantity * parseInt(i.price);
      allItemsList.push(itemPrice);
    });
    const totalSum = allItemsList.reduce((i, acc) => i + acc, 0);
    setTotal(totalSum);
  }, [orderItems]);

  const handleDelete = (id) => {
    dispatch(deleteItem(id));
  };

  const handleReset = () => {
    dispatch(resetBasket());
  };

  const handleChange = (id, counter) => {
    const item = items.find((i) => i._id === id);
    const newItem = { ...item, quantity: item.quantity + counter };
    dispatch(editItemBasket(newItem));
  };
  if (items.length > 0) {
    return (
      <>
        {items.map((count) => (
          <Counter
            key={count._id}
            onDelete={handleDelete}
            onChange={handleChange}
            orderItems={count}
          />
        ))}
        <h5>
          Общая стоимость:{" "}
          <span style={{ fontWeight: "900", color: "blue" }}>
            {total} &#8381;
          </span>
        </h5>
        <button className="btn btn-primary btn-sm m-2" onClick={handleReset}>
          Reset
        </button>
      </>
    );
  }
};

CountersList.propTypes = {
  orderItems: PropTypes.array
};

export default CountersList;
