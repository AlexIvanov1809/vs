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
import OrderSubmit from "../../ui/orderSubmit";

const CountersList = () => {
  const dispatch = useDispatch();
  const orderItems = useSelector(getStore());
  const [hiddenItem, setHidden] = useState(true);
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
  const handleSubmit = (costumerData) => {
    const dataToSand = { ...costumerData, items, total, _id: Date.now() };
    console.log(dataToSand);
    handleReset();
    setHidden(true);
  };
  if (items.length > 0) {
    return (
      <div className="card p-2">
        {items.map((count) => (
          <Counter
            key={count._id}
            onDelete={handleDelete}
            onChange={handleChange}
            orderItems={count}
          />
        ))}
        <h5 className="ms-2">
          Общая стоимость:{" "}
          <span style={{ fontWeight: "900", color: "blue" }}>
            {total} &#8381;
          </span>
        </h5>
        <OrderSubmit hid={hiddenItem} onSubmit={handleSubmit} />
        <button className="btn btn-primary btn-sm m-2" onClick={handleReset}>
          Reset
        </button>
        <button
          className="btn btn-primary btn-sm m-2"
          onClick={() => setHidden(false)}
          hidden={!hiddenItem}
        >
          Оформить заказ
        </button>
      </div>
    );
  }
};

CountersList.propTypes = {
  orderItems: PropTypes.array
};

export default CountersList;
