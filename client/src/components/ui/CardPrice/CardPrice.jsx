import React from "react";
import styles from "./CardPrice.module.css";

const CardPrice = ({ price, active, ...props }) => {
  return (
    <div
      {...props}
      key={price.id}
      className={styles.price_item}
      data-active={active}
    >
      <div>{price.weight}</div>
      <div>{price.value} &#8381;</div>
    </div>
  );
};

export default CardPrice;
