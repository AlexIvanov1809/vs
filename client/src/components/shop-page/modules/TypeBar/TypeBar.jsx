import React, { useContext } from "react";
import styles from "./TypeBar.module.css";
import { Context } from "../../../../";
import cn from "classnames";

const TypeBar = ({ className }) => {
  const { products } = useContext(Context);
  return (
    <div className={cn(className, styles.item_container)}>
      {products.types.map((type) => (
        // кликабельные эллементы лучше делать кнопками для доступности
        <div
          className={styles.item}
          key={type.id}
          onClick={() => products.setSelectedType(type.id)}
          data-active={type.id === products.selectedType.id}
        >
          {type.name}
        </div>
      ))}
    </div>
  );
};

export default TypeBar;
