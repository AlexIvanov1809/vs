import React, { useContext, useEffect, useState } from "react";
import styles from "./ShopFilterList.module.css";
import { Context } from "../../..";
import CheckBox from "../../ui/CheckBox/CheckBox";

const ShopFilterList = ({ refresh, label, list, onChange, filterType }) => {
  const { products } = useContext(Context);
  const [data, setData] = useState(null);
  const [changes, setChanges] = useState(true);

  useEffect(() => {
    products[list].forEach((b) => {
      setData((prev) => ({ ...prev, [b.id]: false }));
    });
  }, [products, refresh]);

  useEffect(() => {
    const list = [];
    for (const key in data) {
      if (data[key]) {
        list.push(key);
      }
    }
    onChange(filterType, list);
  }, [changes]);

  const changeHandler = ({ name, value }) => {
    setData((prev) => ({ ...prev, [name]: value }));
    setChanges(!changes);
  };
  return (
    <div>
      <h3>{label}</h3>
      <div>
        {data &&
          products[list].map((item) => (
            <CheckBox
              name={item.id}
              value={data[item.id]}
              className={styles.item}
              key={item.id}
              onChange={changeHandler}
            >
              {item.name}
            </CheckBox>
          ))}
      </div>
    </div>
  );
};

export default ShopFilterList;
