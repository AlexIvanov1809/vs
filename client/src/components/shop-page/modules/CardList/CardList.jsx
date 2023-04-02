import React, { useContext, useState } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../../../../";
import styles from "./CardList.module.css";
import Card from "../../Card/Card";

const CardList = observer(({ className }) => {
  const { products } = useContext(Context);

  return (
    <div className={className}>
      <div className={styles.card_container}>
        {products.products?.length > 0 &&
          products.products.map(
            (item) => item.active && <Card key={item.id} product={item} />,
          )}
      </div>
    </div>
  );
});

export default CardList;
