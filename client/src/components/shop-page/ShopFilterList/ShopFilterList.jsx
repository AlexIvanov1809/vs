import React, { useContext, useEffect, useState } from "react";
import styles from "./ShopFilterList.module.css";
import { CheckBox } from "../../ui/";
import { Context } from "../../..";

const ShopFilterList = ({ refresh, label, list, onChange, filterType }) => {
  const { products } = useContext(Context);
  const [data, setData] = useState(null);
  // проблема с неймигов. Сейчас переменная звучит, как массив каких-то изменений
  const [changes, setChanges] = useState(true);

  useEffect(() => {
    products[list].forEach((b) => {
      setData((prev) => ({ ...prev, [b.id]: false }));
    });
  }, [products, refresh]);

  useEffect(() => {
    // в замыкании уже существует переменная с таким названием, придумай что-то новое
    const list = [];
    for (const key in data) {
      if (data[key]) {
        list.push(key);
      }
    }
    onChange(filterType, list);
  },
  // зависимость, которая не используется в useEffect-е это не очень хороший признак
    [changes]
  );

  const changeHandler = ({ name, value }) => {
    setData((prev) => ({ ...prev, [name]: value }));
    // не понял, для чего это? чтобы триггерить useEffect? почему
    // нельзя завязаться на data?
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
