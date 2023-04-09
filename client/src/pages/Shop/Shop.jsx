import React, { useContext, useEffect, useState } from "react";
import styles from "./Shop.module.css";
import { Loader } from "../../components/ui/";
import {
  TypeBar,
  Aside,
  CardList,
  Pagination,
} from "../../components/shop-page/";
import httpService from "../../http/productAPI";
import { ENTITY_TYPES } from "../../utils/consts";
import { Context } from "../../";
import { observer } from "mobx-react-lite";

const Shop = observer(() => {
  const { products } = useContext(Context);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    ENTITY_TYPES.forEach((item) => {
      httpService
        .fetchEntityFilterItems(item.endpoint, products.selectedType)
        .then((data) => {
          products[item.setter](data);
        })
        .catch((e) => e);
    });
    console.log(products.types[0]?.id);

    httpService
      // очень странно передавать ничего в функцию, которая принимает 9 аргументов))
      .fetchProducts()
      .then((data) => {
        products.setProducts(data.rows);
        products.setTotalCount(data.count / 2);
      })
      .catch((e) => console.log(e.response.data.message))
      .finally(() => {
        // почему загрузка прекращается, не дожидаясь fetchEntityFilterItems?
        setIsLoading(false);
      });
  }, [products]);

  useEffect(() => {
    httpService
      .fetchProducts(
        products.selectedType,
        products.selectedBrand,
        products.selectedCountry,
        products.selectedMakingMethod,
        products.selectedManufacturingMethod,
        products.selectedTeaType,
        products.selectedPackageType,
        products.page,
        products.limit,
      )
      .then((data) => {
        products.setProducts(data.rows);
        // почему делится на два?
        products.setTotalCount(data.count / 2);
      })
      // а если ошибка не серверная? по-моему респонс не обязательное поле
      .catch((e) => console.log(e.response.data.message));
  }, [
    // зачем передавать весь products, а потом отдельные его части? Когда так много зависимостей, их выносят в объект
    // вообще, эти зивисимости похожи на отдельное хранилище, типа StoreFilter, т.к. оно не существует нигде за пределами магазина
    products,
    products.selectedType,
    products.selectedBrand,
    products.selectedCountry,
    products.selectedMakingMethod,
    products.selectedManufacturingMethod,
    products.selectedTeaType,
    products.selectedPackageType,
    products.page,
    // products.limit ?
  ]);

  useEffect(() => {
    ENTITY_TYPES.forEach((item) => {
      httpService
        // неочевидные аргументы
        .fetchEntityFilterItems(item.endpoint, products.selectedType)
        .then((data) => {
          products[item.setter](data);
        })
        .catch((e) => console.log(e.response.data.message));
    });
  }, [products, products.selectedType]);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <main className={styles.main_shop}>
      <TypeBar className={styles.type} />
      <Aside className={styles.aside} />
      <CardList className={styles.shop} />
      <Pagination className={styles.pagination} />
    </main>
  );
});

export default Shop;
