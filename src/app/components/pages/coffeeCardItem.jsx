import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ItemImage from "../ui/itemImage";
import Scale from "../common/scale";
import PriceItem from "../ui/priceItem";
import BuyButton from "../common/buttons/buyButton";
import { nanoid } from "@reduxjs/toolkit";

const CoffeeCardItem = ({ coffeeItem, onChange }) => {
  const [name, setName] = useState();
  useEffect(() => {
    if (!coffeeItem.price.quarter) {
      if (!coffeeItem.price.kg) {
        if (!coffeeItem.price.drip) {
          setName("");
        } else {
          setName("drip");
        }
      } else {
        setName("kg");
      }
    } else {
      setName("quarter");
    }
  }, []);

  const HandleChangeImg = (itemName) => {
    setName(itemName);
  };

  const handleChange = (item) => {
    const order = {
      id: nanoid(),
      _id: coffeeItem._id,
      country: coffeeItem.country,
      sort: coffeeItem.sortName,
      quantity: item,
      price: coffeeItem.price[name]
    };
    onChange(order);
  };
  return (
    <>
      <div
        className="div m-2  text-center shadow p-2"
        style={{ width: "350px" }}
      >
        <h4>{coffeeItem.brand}</h4>
        <p>{coffeeItem.preparationMethod}</p>
        <h2>
          {coffeeItem.country} {coffeeItem.sortName}
        </h2>
        <p>{coffeeItem.method}</p>

        <ItemImage item={name} visibility={coffeeItem.price} />
        <p>{coffeeItem.kind}</p>

        <p>{coffeeItem.description}</p>

        <div className="d-flex justify-content-between">
          <Scale value={coffeeItem.acidity} name="Кислотность" />
          <Scale value={coffeeItem.density} name="Плотность" />
        </div>
        <p>{!coffeeItem.grind ? "Beans" : "Grounded"}</p>
        <div className="d-flex justify-content-between align-items-center">
          <PriceItem item={coffeeItem} onChange={HandleChangeImg} />
          <BuyButton onChange={handleChange} />
        </div>
      </div>
    </>
  );
};

CoffeeCardItem.propTypes = {
  coffeeItem: PropTypes.object,
  onChange: PropTypes.func
};

export default CoffeeCardItem;
