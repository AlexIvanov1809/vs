import React, { useContext, useEffect, useState } from "react";
import styles from "./Card.module.css";
import { Scale, CardPrice, SelectField } from "../../ui/";
import { ImgCarousel, OrderCardBtn } from "../";
import { Context } from "../../..";
import { BEANS } from "../../../utils/consts";
import { observer } from "mobx-react-lite";

const Card = observer(({ product }) => {
  const { basket } = useContext(Context);
  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState(1);
  const [order, setOrder] = useState([]);
  const [bought, setBought] = useState(false);
  const [beans, setBeans] = useState({ id: "", name: "" });

  useEffect(() => {
    setPrice(product.price[0]);
  }, [product]);

  useEffect(() => {
    if (order.length) {
      basket.setOrder(order);
      localStorage.setItem("venditore_basket", JSON.stringify(order));
    }
    if (basket.order.length) {
      basket.order.forEach((i) => {
        if (i.id.split("-")[0] === product.id.toString()) {
          setBought(true);
        }
      });
    }
  }, [order]);

  const grindType = ({ value }) => {
    setBeans({ id: value, name: BEANS[value].name });
  };

  const orderHandler = () => {
    const inBasket = basket.order;
    const newOrder = {
      id: product.id + "-" + price.weight,
      brand: product.brand?.name,
      name: `${product.country?.name || ""} ${product.sortName}`,
      beans: beans.name,
      weight: price.weight,
      value: +price.value * quantity,
      quantity: quantity,
    };
    const filtered = inBasket.filter((item) => item.id !== newOrder.id);
    filtered.push(newOrder);
    setOrder(filtered);
  };

  return (
    <div key={product.id} className={styles.card}>
      <div className={styles.product_container}>
        <div>
          <h4>{product.brand?.name}</h4>
          <h4>{product.teaType?.name}</h4>
          <h4>
            {product.country ? product.country.name + " " : ""}
            {product.sortName}
          </h4>
        </div>
        <div>
          <ImgCarousel images={product.image} />
        </div>
        <span>{product.making_method?.name}</span>
        <span>{product.manufacturing_method?.name}</span>
        <span>{product.package_type?.name}</span>
        <div className={styles.product_scale}>
          <Scale value={product.acidity} name="Кислотность" />
          <Scale value={product.density} name="Плотность" />
        </div>
        <p>{product.shortDescription}</p>
        <p>{product.description}</p>
        <div>
          <SelectField
            label="Выберете помол"
            options={BEANS}
            value={beans.id}
            onChange={grindType}
          />
        </div>
        <div className={styles.price_buy}>
          <div className={styles.price}>
            {product.price.map((p) => (
              <CardPrice
                key={p.id}
                onClick={() => setPrice(p)}
                price={p}
                active={p.id === price?.id}
              />
            ))}
          </div>
          <OrderCardBtn
            className={styles.order_btn}
            bought={bought}
            quantity={quantity}
            setQuantity={setQuantity}
            onOrder={orderHandler}
          />
        </div>
      </div>
    </div>
  );
});

export default Card;
