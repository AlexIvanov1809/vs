import React from "react";
import Button from "../../ui/Button/Button";

const BasketItem = ({ className, changeHandler, item }) => {
  return (
    <li className={className}>
      <span>{item.brand}</span>
      <span>{item.beans}</span>
      <span>{item.name}</span>
      <span>{item.weight}</span>
      <span>{item.value} RUB</span>
      <Button
        onClick={() => changeHandler(item.id, "+")}
        appearance="primary"
        icon="Plus"
      />

      <span>{item.quantity}</span>
      <Button
        appearance="primary"
        onClick={() => changeHandler(item.id, "-")}
        icon="Minus"
      />
      <Button
        appearance="danger"
        onClick={() => changeHandler(item.id, "del")}
        icon="Delete"
      />
    </li>
  );
};

export default BasketItem;
