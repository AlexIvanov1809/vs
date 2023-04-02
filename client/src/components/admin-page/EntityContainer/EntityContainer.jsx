import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../..";
import httpService from "../../../http/productAPI";
import Button from "../../ui/Button/Button";
import EntitiesEditor from "../EntitiesEditor/EntitiesEditor";
import styles from "./EntityContainer.module.css";

const EntityContainer = observer(({ endpoint, label, getter, setter }) => {
  const { products } = useContext(Context);
  const [show, setShow] = useState(false);
  const [item, setItem] = useState(null);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    httpService
      .fetchEntityItems(endpoint)
      .then((data) => {
        products[setter](data);
      })
      .catch((e) => e);
  }, [refresh, products]);

  const onHide = (bool) => {
    setItem(null);
    setShow(bool);
    setRefresh(!refresh);
  };

  const removeItem = (id) => {
    httpService
      .removeEntityItem(endpoint, id)
      .then((data) => setRefresh(!refresh));
  };

  const editItem = (item) => {
    setItem(item);
    setShow(true);
  };

  return (
    <div>
      <div className={styles.types_container}>
        <h6>{label}</h6>
        <div className={styles.types_list}>
          {products[getter].map((item) => (
            <div className={styles.types_item} key={item.id}>
              <div>{item.name}</div>
              <div>
                <Button
                  appearance="primary"
                  onClick={() => editItem(item)}
                  icon="Edit"
                />
                <Button
                  appearance="danger"
                  onClick={() => removeItem(item.id)}
                  icon="Delete"
                />
              </div>
            </div>
          ))}
        </div>
        <Button appearance="primary" onClick={() => setShow(!show)}>
          Создать
        </Button>
      </div>
      {show && (
        <EntitiesEditor
          endpoint={endpoint}
          label={item ? "Обновить" : "Создать"}
          onHide={onHide}
          item={item}
        />
      )}
    </div>
  );
});

export default EntityContainer;
