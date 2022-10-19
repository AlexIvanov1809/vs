import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import BuyButton from "../common/buttons/buyButton";
import { useDispatch, useSelector } from "react-redux";
import {
  editItemBasket,
  getStore,
  storeAdding
} from "../../store/consumerBasket";
import currentPrice from "../../utils/currentPrice";
import localStorageSevice from "../../service/localStorage.service";

const TeaCardItem = ({ teaItem, onOrder }) => {
  const dispatch = useDispatch();
  const [bought, setBought] = useState(false);
  const basket = useSelector(getStore());
  useEffect(() => {
    if (basket.length > 0) {
      localStorageSevice.setBasketItems(basket);
    }
    basket.forEach((i) => {
      if (i._id === teaItem._id) {
        return setBought(true);
      }
    });
  }, [basket]);
  const price = currentPrice(teaItem);

  const unit = teaItem.weight === "шт" ? teaItem.weight : teaItem.weight + " г";
  const handleSubmit = (item) => {
    let same = false;
    const order = {
      _id: teaItem._id,
      brand: teaItem.brand,
      name: teaItem.name,
      quantity: item,
      price,
      weight: unit
    };
    basket.map((i) => {
      if (i._id === order._id) {
        same = true;
        const newQuantity = order.quantity + i.quantity;
        order.quantity = newQuantity;
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
        src={"../" + teaItem.images.tea.htmlPath}
        className="d-block w-75 mx-auto"
        alt="Tea"
      />
      <h2>{teaItem.name}</h2>
      <p className="text-start">{teaItem.description}</p>
      <div className="d-flex">
        <div className="w-100 text-start">
          <p>{unit}</p>
          <p>{price} &#8381;</p>
          <BuyButton
            onChange={handleSubmit}
            bought={bought}
            onOrder={onOrder}
          />
        </div>
      </div>
    </div>
  );
};

TeaCardItem.propTypes = {
  teaItem: PropTypes.object,
  onOrder: PropTypes.func
};

export default TeaCardItem;
