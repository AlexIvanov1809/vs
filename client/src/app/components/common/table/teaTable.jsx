import React from "react";
import PropTypes from "prop-types";
// import Price from "../price";
import Table from "./table";

const TeaTable = ({ teaItems }) => {
  const columns = {
    brand: {
      path: "brand",
      name: "Бренд"
    },
    teaTypes: {
      path: "type",
      name: "Вид"
    },
    name: {
      path: "name",
      name: "Название"
    },
    description: {
      path: "description",
      name: "Описание"
    },
    weight: {
      path: "weight",
      name: "Вес"
    },
    price: {
      path: "price",
      name: "Стоимость"
      // component: (item) => <Price price={item.price} />
    },
    active: {
      path: "active",
      name: "",
      component: (item) => (item.active ? <p>Активный</p> : <p>Неактивен</p>)
    }
  };
  return <Table columns={columns} data={teaItems} type="tea" />;
};

TeaTable.propTypes = {
  teaItems: PropTypes.array
};

export default TeaTable;