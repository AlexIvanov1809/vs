import React, { useEffect, useState } from "react";
import Counter from "./counter";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  backupBasket,
  deleteItem,
  editItemBasket,
  getStore,
  resetBasket
} from "../../../store/consumerBasket";
import OrderSubmit from "../../ui/orderSubmit";
import localStorageSevice from "../../../service/localStorage.service";
import messageConverter from "../../../utils/messageConverter";
import orderService from "../../../service/order.service";
import { Link } from "react-router-dom";

const CountersList = () => {
  const dispatch = useDispatch();
  const orderItems = useSelector(getStore());
  const localStorageorderItems = localStorageSevice.getBasketItems();
  // const [hiddenItem, setHidden] = useState(true);
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState();
  // const [minOrder, setMinOrder] = useState("");
  useEffect(() => {
    if (orderItems.length > 0) {
      setItems(orderItems);
      localStorageSevice.setBasketItems(orderItems);
    } else if (orderItems.length === 0 && localStorageorderItems) {
      dispatch(backupBasket(localStorageorderItems));
      localStorageSevice.removeBasketItems();
    } else {
      setItems(orderItems);
    }
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
    localStorageSevice.removeBasketItems();
  };
  // const handleShow = () => {
  //   setHidden(false);

  // if (total >= 1500) {
  //   setHidden(false);
  //   setMinOrder("");
  // } else {
  //   setMinOrder("Минимальный  заказ для доставки 1000 руб.");
  // }
  // };

  const handleReset = () => {
    localStorageSevice.removeBasketItems();
    // setHidden(true);
    dispatch(resetBasket());
  };

  const handleChange = (id, counter) => {
    const item = items.find((i) => i._id === id);
    const newItem = { ...item, quantity: item.quantity + counter };
    dispatch(editItemBasket(newItem));
  };
  const handleSubmit = async (costumerData) => {
    const dataToSand = { ...costumerData, items, total, _id: Date.now() };
    const message = messageConverter(dataToSand);
    await orderService.create({ message });
    handleReset();
  };
  if (items.length > 0) {
    return (
      <div className="container">
        <div className="p-2 d-flex justify-content-center ">
          <div className="card mx-1" style={{ width: "500px" }}>
            <OrderSubmit
              // hid={hiddenItem}
              onSubmit={handleSubmit}
            />
          </div>
          <div className="card justify-content-between mx-1">
            <div>
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
              <p className="ms-2">Минимальный заказ для доставки 1000 руб.</p>
            </div>
            <div className="text-end mx-1">
              <button
                className="btn btn-danger btn-sm m-2"
                onClick={handleReset}
              >
                Очистить корзину
              </button>
            </div>
          </div>

          {/* <button
          className="btn btn-primary btn-sm m-2"
          onClick={handleShow}
          hidden={!hiddenItem}
        >
          Оформить заказ
        </button> */}
        </div>
      </div>
    );
  } else {
    return (
      <>
        <p>Пустая корзина</p>
        <Link className="btn btn-primary" to={"/market/coffee"}>
          Перейти в каталог
        </Link>
      </>
    );
  }
};

CountersList.propTypes = {
  orderItems: PropTypes.array
};

export default CountersList;
