import React, { useContext } from "react";
import styles from "./NavBar.module.css";
import { NavLink } from "react-router-dom";
import {
  ADMIN_ROUTE,
  BASKET_ROUTE,
  LOGIN_ROUTE,
  SHOP_ROUTE,
} from "../../../utils/consts";
import { observer } from "mobx-react-lite";
import { Context } from "../../..";

const Navbar = observer(() => {
  const { basket } = useContext(Context);
  return (
    <header className={styles.header}>
      <NavLink to={SHOP_ROUTE}>Logo</NavLink>
      <nav className={styles.links}>
        <NavLink to={SHOP_ROUTE}>Shop</NavLink>
        <NavLink to={ADMIN_ROUTE}>Admin</NavLink>
        <NavLink to={LOGIN_ROUTE}>Login</NavLink>
        <div className={styles.basket}>
          <NavLink to={BASKET_ROUTE}>Basket</NavLink>
          {basket.order.length > 0 && (
            <div className={styles.order_qty}>{basket.order.length}</div>
          )}
        </div>
      </nav>
    </header>
  );
});

export default Navbar;
