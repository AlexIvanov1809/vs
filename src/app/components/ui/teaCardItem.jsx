import React from "react";
import BuyButton from "../common/buttons/buyButton";
import { useDispatch, useSelector } from "react-redux";
import {
  editItemBasket,
  getStore,
  storeAdding
} from "../../store/consumerBasket";

const TeaCardItem = ({ teaItem }) => {
  const dispatch = useDispatch();
  const basket = useSelector(getStore());
  const currentPrice =
    teaItem.weight === "шт"
      ? teaItem.price
      : Math.ceil((parseInt(teaItem.price) / 1000) * parseInt(teaItem.weight));
  const unit = teaItem.weight === "шт" ? teaItem.weight : teaItem.weight + " г";
  const handleSubmit = (item) => {
    let same = false;
    const order = {
      _id: teaItem._id,
      name: teaItem.name,
      quantity: item,
      price: currentPrice,
      weight: unit
    };
    basket.map((i) => {
      if (i._id === order._id) {
        same = true;
      }
      return i;
    });
    if (!same) {
      dispatch(storeAdding(order));
    } else {
      dispatch(editItemBasket(order));
    }
  };
  return (
    <div className="div m-2  text-center shadow p-4" style={{ width: "350px" }}>
      <h4>{teaItem.brand}</h4>
      <p>{teaItem.type}</p>
      <img
        src={"../img/tea.jpg"}
        className="d-block w-75 mx-auto"
        alt="Coffee 250"
      />
      <h2>{teaItem.name}</h2>
      <p className="text-start">{teaItem.description}</p>
      <div className="d-flex">
        <div className="w-100 text-start">
          <p>{unit}</p>
          <p>{currentPrice} &#8381;</p>
          <BuyButton onChange={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default TeaCardItem;
