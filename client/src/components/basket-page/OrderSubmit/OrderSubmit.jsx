import React, { useState } from "react";
import styles from "./OrderSubmit.module.css";
import Button from "../../ui/Button/Button";
import TextInput from "../../ui/TextInput/TextInput";
import TextAreaField from "../../ui/TextAriaField/TextAreaField";

const OrderSubmit = ({ onSubmit }) => {
  const [orderData, setOrderData] = useState({
    name: "",
    phone: "",
    address: "",
    comment: "",
  });

  const changeHandler = ({ name, value }) => {
    setOrderData((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <form
      className={styles.order_submit}
      onSubmit={(e) => onSubmit(e, orderData)}
    >
      <TextInput
        label="Имя"
        name="name"
        value={orderData.name}
        onChange={changeHandler}
      />
      <TextInput
        label="Номер телефона"
        name="phone"
        type="tel"
        value={orderData.phone}
        onChange={changeHandler}
      />
      <TextInput
        label="Адрес доставки"
        name="address"
        value={orderData.address}
        onChange={changeHandler}
      />
      <TextAreaField
        label="Комментарии к заказу "
        name="comment"
        value={orderData.comment}
        onChange={changeHandler}
      />
      <Button appearance="primary" type="submit">
        Отправить
      </Button>
    </form>
  );
};

export default OrderSubmit;
