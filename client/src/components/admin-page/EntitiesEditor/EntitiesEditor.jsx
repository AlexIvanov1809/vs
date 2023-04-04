import React, { useState } from "react";
import styles from "./EntitiesEditor.module.css";
import { Button, TextInput } from "../../ui/";
import DeleteBtn from "../DeleteBtn/DeleteBtn";
import httpService from "../../../http/productAPI";

const EntitiesEditor = ({ onDelete, label, onHide, item, endpoint }) => {
  const [value, setValue] = useState({ name: item ? item.name : "" });

  const changeHandle = ({ value }) => {
    setValue({ name: value });
  };

  const onSubmit = () => {
    if (item) {
      httpService
        .editEntityItem(endpoint, item.id, value)
        .then((data) => onHide(false))
        .catch((e) => console.log(e));
    } else {
      httpService
        .createEntityItem(endpoint, value)
        .then((data) => onHide(false));
    }
  };

  return (
    <div className={styles.main_entity}>
      <div className={styles.entity_container}>
        <h5>{label}</h5>
        <div className={styles.entity_form}>
          <TextInput
            name="name"
            value={value.name}
            onChange={changeHandle}
            type="text"
            placeholder="Enter value"
          />
          <div className={styles.buttons}>
            {item && <DeleteBtn onDelete={onDelete} id={item.id} />}
            <Button appearance="danger" onClick={() => onHide(false)}>
              Close
            </Button>
            <Button appearance="primary" onClick={onSubmit}>
              {item ? "Обновить" : "Создать"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntitiesEditor;
