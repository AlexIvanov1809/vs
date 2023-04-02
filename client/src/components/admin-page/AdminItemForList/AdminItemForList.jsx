import React from "react";
import styles from "./AdminItemForList.module.css";
import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";

const AdminItemForList = observer(({ item }) => {
  return (
    <div className={styles.admin_item}>
      <NavLink to={"/admin/item/" + item.id}>
        <div>{item.type?.name}</div>
        <div>{item.brand?.name}</div>
        <div>{item.country?.name}</div>
        <div>{item.sortName}</div>
        <div>{item.making_method?.name}</div>
        <div>{item.manufacturing_method?.name}</div>
        <div>{item.tea_type?.name}</div>
        <div>{item.active ? "true" : "false"}</div>
      </NavLink>
    </div>
  );
});

export default AdminItemForList;
