import React from "react";
import PropTypes from "prop-types";
import Converter from "../converter";
import Price from "../price";
import Table from "./table";

const CoffeeTable = ({ coffeeItems }) => {
  const columns = {
    brand: {
      path: "brand",
      name: "Бренд",
      component: (item) => <Converter id={item.brand} itemName={"brand"} />
    },
    countries: {
      path: "countries",
      name: "Страна",
      component: (item) => (
        <Converter id={item.countries} itemName={"countries"} />
      )
    },
    grade: {
      path: "grade",
      name: "Сорт, название смеси"
    },
    method: {
      path: "method",
      name: "Метод обработки",
      component: (item) => <Converter id={item.method} itemName={"method"} />
    },
    kind: {
      path: "kind",
      name: "Метод обработки",
      component: (item) => <Converter id={item.kind} itemName={"kind"} />
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
    }
  };
  return <Table columns={columns} data={coffeeItems} />;
};

CoffeeTable.propTypes = {
  coffeeItems: PropTypes.array
};

export default CoffeeTable;
