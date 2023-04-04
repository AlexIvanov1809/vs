import React from "react";
import { Button } from "../../ui/";

const OrderCardBtn = ({
  className,
  bought,
  quantity,
  setQuantity,
  onOrder,
}) => {
  return (
    <div className={className}>
      <div>
        <Button
          appearance="primary"
          onClick={() =>
            setQuantity((prev) => (prev - 1 !== 0 ? prev - 1 : prev))
          }
          icon="Minus"
        />
        <span>{quantity}</span>
        <Button
          appearance="primary"
          onClick={() => setQuantity((prev) => prev + 1)}
          icon="Plus"
        />
      </div>
      <Button appearance="primary" onClick={onOrder}>
        {!bought ? "Buy" : "add"}
      </Button>
    </div>
  );
};

export default OrderCardBtn;
