import React, { useContext, useEffect, useState } from "react";
import styles from "./Basket.module.css";
import { Context } from "../../";
import { observer } from "mobx-react-lite";
import Button from "../../components/ui/Button/Button";
import messageConverter from "../../utils/messageConverter";
import { sendOrder } from "../../http/orderAPI";
import OrderSubmit from "../../components/basket-page/OrderSubmit/OrderSubmit";
import BasketItem from "../../components/basket-page/BasketItem/BasketItem";
import { useNavigate } from "react-router-dom";

const Basket = observer(() => {
  const navigate = useNavigate();
  const { basket } = useContext(Context);
  const [inBasket, setInBasket] = useState(basket.order);
  const [confirm, setConfirm] = useState(false);

  useEffect(() => {
    setInBasket(basket.order);
    localStorage.setItem("venditore_basket", JSON.stringify(basket.order));
  }, [basket, basket.order]);

  const changeHandler = (id, action) => {
    switch (action) {
      case "+":
        basket.setIncrementQty(id);
        break;

      case "-":
        basket.setDecrementQty(id);
        break;

      case "del":
        const filtered = inBasket.filter((item) => item.id !== id);
        basket.setOrder(filtered);
        break;

      default:
        break;
    }
  };

  const submitHandle = (e, orderData) => {
    e.preventDefault();
    let total = 0;
    inBasket.forEach((i) => {
      total += parseInt(i.value);
    });

    const message = messageConverter({
      ...orderData,
      items: inBasket,
      total,
      id: Date.now(),
    });

    sendOrder(message)
      .then(() => {
        basket.setOrder([]);
        localStorage.removeItem("venditore_basket");
        navigate("/");
      })
      .catch((e) => console.log(e.response.data.message));
  };

  return (
    <main className={styles.basket}>
      <div>
        <ol className={styles.products_list}>
          {inBasket.length > 0 &&
            inBasket.map((item) => (
              <BasketItem
                item={item}
                className={styles.product}
                key={item.id}
                changeHandler={changeHandler}
              />
            ))}
        </ol>
        <Button appearance="primary" onClick={() => setConfirm(true)}>
          Оформить покупку
        </Button>
      </div>
      {confirm && <OrderSubmit onSubmit={submitHandle} />}
    </main>
  );
});

export default Basket;
