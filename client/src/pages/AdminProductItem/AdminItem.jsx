import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import styles from "./AdminItem.module.css";
import { useNavigate, useParams } from "react-router-dom";
import httpService from "../../http/productAPI";
import { ADMIN_ROUTE, ENTITY_TYPES } from "../../utils/consts";
import Button from "../../components/ui/Button/Button";
import Scale from "../../components/ui/Scale/Scale";
import EditItemModule from "../../components/admin-page/EditItemModule/EditItemModule";
import { Loader } from "../../components/ui/";
import { DeleteBtn } from "../../components/admin-page/";
import { Context } from "../..";

const AdminItem = observer(() => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { products } = useContext(Context);
  const [isLoading, setIsLoading] = useState(true);
  const [item, setItem] = useState(null);
  const [editing, setEditing] = useState(false);
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    if (
      products.products?.length === 0 ||
      // зачем эта проверка, если products - всегда массив, даже если и пустой?
      !Array.isArray(products.products) ||
      updated
    ) {
      ENTITY_TYPES.forEach((item) => {
        httpService
          .fetchEntityItems(item.endpoint)
          .then((data) => products[item.setter](data));
      });

      httpService
        .fetchOneProduct(id)
        .then((data) => products.setProducts(data))
        .finally(() => {
          // странно, что сюда передаётся массив, а ниже - объект
          setItem(products.products);
          // почему загрузка не дожидается завершения fetchEntityItems?
          setIsLoading(false);
          setUpdated(false);
        });
    } else {
      // выглядит нелогично. В каком случае айди будет не числовым?
      const data = products.products.filter((item) => item.id === parseInt(id));
      setItem(data[0]);
      setIsLoading(false);
    }
  }, [products, updated, id]);

  const removeHandle = (id) => {
    setIsLoading(true);
    httpService
      .removeProduct(id)
      .then((d) => {
        console.log(d);
        navigate(ADMIN_ROUTE);
      })
      .catch((e) => console.log(e))
      .finally(() => setIsLoading(false));
  };

  const editHandle = () => {
    setEditing(!editing);
  };

  if (isLoading || !item) {
    return <Loader />;
  }

  return (
    <div className={styles.main_item}>
      <Button appearance="primary" onClick={() => navigate(ADMIN_ROUTE)}>
        Back
      </Button>
      <div className={styles.item_container}>
        <div>
          {/* много optional chaining. Почему эти поля могут быть пустыми? */}
          <h3>{item.type?.name}</h3>
          <h4>{item.brand?.name}</h4>
          <h4>{item.tea_type?.name}</h4>
          <h4>
            {item.country?.name} {item.sortName}
          </h4>
        </div>
        <div>
          {/* не скупись на названия переменных) i - обычно подразумевает итератор. переименуй на image */}
          {/* и вообще, почему item.image, а не item.images? это ведь массив */}
          {item.image.map((i) => (
            <img
              key={i.id}
              width={120}
              // создай файл, типа config, где будут замаплены переменные окружения и используй этот объект в коде,
              // вместо прямого обращения к process.env:
              // {
              //   apiUrl: process.env.REACT_APP_API_URL,
              //   ...
              //  }
              src={process.env.REACT_APP_API_URL + i.name}
              alt="item"
            />
          ))}
        </div>
        <span>{item.making_method?.name}</span>
        <span>{item.manufacturing_method?.name}</span>
        <div className={styles.item_scale}>
          <Scale value={item.acidity} name="Кислотность" />
          <Scale value={item.density} name="Плотность" />
        </div>
        {/* почему смешиваются camel case и snake case в свойствах? почитай пункт 12 в ридми */}
        <span>{item.package_type?.name}</span>
        <p>{item.shortDescription}</p>
        <p>{item.description}</p>
        {/* item.prices, price */}
        {item.price.map((p) => (
          <div key={p.id}>
            <div>{p.weight}</div>
            <div>{p.value} &#8381;</div>
          </div>
        ))}
        <div>{item.active ? "true" : "false"}</div>
        <div className={styles.item_buttons}>
          <DeleteBtn onDelete={removeHandle} id={id} />
          <Button
            appearance="primary"
            onClick={() => editHandle(id)}
            icon="Edit"
          />
        </div>
      </div>
      {editing && (
        <EditItemModule
          product={item}
          // название пропса не соответствует тому, что в него передаётся
          updated={setUpdated}
          onHide={editHandle}
        />
      )}
    </div>
  );
});

export default AdminItem;
