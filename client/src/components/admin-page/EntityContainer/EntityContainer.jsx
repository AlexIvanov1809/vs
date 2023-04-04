import React, { useContext, useEffect, useState } from "react";
import styles from "./EntityContainer.module.css";
import { Button } from "../../ui/";
import EntitiesEditor from "../EntitiesEditor/EntitiesEditor";
import { observer } from "mobx-react-lite";
import httpService from "../../../http/productAPI";
import { Context } from "../../..";
import cn from "classnames";

const EntityContainer = observer(({ endpoint, label, getter, setter }) => {
  const { products } = useContext(Context);
  const [show, setShow] = useState(false);
  const [item, setItem] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const containerName = cn(styles.types_container, {
    [styles.type_black]: label === "Типы",
  });

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
    httpService.removeEntityItem(endpoint, id).then((data) => {
      onHide(false);
    });
  };

  const editItem = (item) => {
    setItem(item);
    setShow(true);
  };

  return (
    <div>
      <div className={containerName}>
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
          onDelete={removeItem}
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
