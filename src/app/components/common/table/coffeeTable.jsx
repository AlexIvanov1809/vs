import React from "react";
import PropTypes from "prop-types";
import Price from "../price";
import Table from "./table";

const CoffeeTable = ({ coffeeItems }) => {
  const columns = {
    brand: {
      path: "brand",
      name: "Бренд"
    },
    countries: {
      path: "country",
      name: "Страна"
    },
    sortName: {
      path: "sortName",
      name: "Сорт, название смеси"
    },
    method: {
      path: "method",
      name: "Метод обработки"
    },
    kind: {
      path: "kind",
      name: "Метод обработки"
    },
    preparationMethod: {
      path: "preparationMethod",
      name: "Метод приготовления"
    },
    description: {
      path: "description",
      name: "Описание"
    },
    acidity: {
      path: "acidity",
      name: "Кислотность"
    },
    density: {
      path: "density",
      name: "Плотность"
    },
    price: {
      path: "price",
      name: "Стоимость",
      component: (item) => <Price price={item.price} />
    },
    active: {
      path: "active",
      name: "",
      component: (item) => (item.active ? <p>Активный</p> : <p>Неактивен</p>)
    }
  };
  return <Table columns={columns} data={coffeeItems} type="coffee" />;
};

CoffeeTable.propTypes = {
  coffeeItems: PropTypes.array
};

export default CoffeeTable;
