import React, { useContext } from "react";
import styles from "./CardList.module.css";
import { Card } from "../../";
import { Context } from "../../../../";
import { observer } from "mobx-react-lite";

// выноси логику в локальные хуки, чтобы в самом компоненте ее не было так много
const useProductsCards = () => {
  const { products } = useContext(Context);

  if (!(products.products?.length > 0)) {
    return [];
  }

  return products.products.filter(item => item.active)
}

const CardList = observer(({ className }) => {
  const cards = useProductsCards();

  return (
    <div className={className}>
      <div className={styles.card_container}>
        {cards.map((item) => <Card key={item.id} product={item} />)}
      </div>
    </div>
  );
});

export default CardList;
