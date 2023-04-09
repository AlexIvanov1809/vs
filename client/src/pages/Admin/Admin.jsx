import React, { useContext, useEffect, useState } from "react";
import styles from "./Admin.module.css";
import { Button, Loader } from "../../components/ui/";
import {
  EntityContainer,
  AdminItemForList,
  EditItemModule,
} from "../../components/admin-page/";
import httpService from "../../http/productAPI";
import { Context } from "../..";
import { wayOfSortingItems } from "../../utils/";
import { ADMIN_ITEM_FIELDS, ENTITY_TYPES } from "../../utils/consts";
import { observer } from "mobx-react-lite";

const Admin = observer(() => {
  const { products } = useContext(Context);
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [updated, setUpdated] = useState(true);
  const [sortType, setSortType] = useState({
    type: "type",
    sort: "asc",
  });

  useEffect(() => {
    if (updated) {
      setIsLoading(true);
      httpService
        .fetchProducts()
        .then((data) => products.setProducts(data.rows))
        .catch((e) => console.log(e.response.data.message))
        .finally(() => {
          products.productSorting(sortType.type, sortType.sort);
          setUpdated(false);
          setIsLoading(false);
        });
    }
  }, [products, updated]);

  useEffect(() => {
    if (Array.isArray(products.products)) {
      products.productSorting(sortType.type, sortType.sort);
    }
  }, [sortType]);

  const onClick = (type) => {
    const sort = wayOfSortingItems(type, sortType);
    setSortType(sort);
  };

  const onHide = () => {
    setShow(!show);
  };
  return (
    <main className={styles.admin}>
      <div className={styles.admin_types}>
        {ENTITY_TYPES.map((type) => (
          <EntityContainer
            key={type.id}
            endpoint={type.endpoint}
            label={type.label}
            getter={type.getter}
            setter={type.setter}
          />
        ))}
      </div>
      <hr />
      <div className={styles.admin_items}>
        <div className={styles.items_fields}>
          {ADMIN_ITEM_FIELDS.map((i) => (
            <div onClick={() => onClick(i.type)} key={i.id}>
              {i.name}
            </div>
          ))}
          <Button appearance="primary" onClick={onHide} icon="Add" />
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          // в общем-то, если в массиве нет элементов, его тоже можно проитерировать; лишнее условие
          products.products.length > 0 &&
          products.products.map((i) => <AdminItemForList key={i.id} item={i} />)
        )}
      </div>
      {show && <EditItemModule updated={setUpdated} onHide={onHide} />}
    </main>
  );
});

export default Admin;
