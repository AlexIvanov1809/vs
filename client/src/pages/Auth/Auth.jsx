import React, { useContext, useState } from "react";
import styles from "./Auth.module.css";
import { Button, TextInput } from "../../components/ui/";
import { NavLink, useLocation } from "react-router-dom";
import { Context } from "../..";
import { check, login, logout, registration } from "../../http/userAPI";
import { REGISTRATION_ROUTE, LOGIN_ROUTE } from "../../utils/consts";
import { observer } from "mobx-react-lite";

const Auth = observer(() => {
  const location = useLocation();
  const { user } = useContext(Context);
  const isLogin = location.pathname === LOGIN_ROUTE;
  const [authData, setAuthData] = useState({
    email: "",
    password: "",
    role: "ADMIN",
  });

  const changeHandle = ({ name, value }) => {
    setAuthData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let data;
      if (isLogin) {
        data = await login(authData.email, authData.password);
      } else {
        data = await registration(
          authData.email,
          authData.password,
          authData.role,
        );
      }
      user.setUser(data);
      user.setIsAuth(true);
      // navigate(SHOP_ROUTE);
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  const onClick = () => {
    check()
      .then((data) => {
        user.setUser(data);
        user.setIsAuth(true);
      })
      .catch((e) => e);
  };

  const logoutClick = () => {
    logout()
      .then()
      .catch((e) => console.log(e));
  };

  return (
    <div className={styles.auth}>
      <h3>{isLogin ? "Login" : "Registration"}</h3>
      <form className={styles.form} onSubmit={handleSubmit}>
        <TextInput
          type="text"
          name="email"
          value={authData.email}
          placeholder="Enter email"
          onChange={changeHandle}
        />
        <TextInput
          type="password"
          name="password"
          value={authData.password}
          placeholder="Enter password"
          onChange={changeHandle}
        />
        <div className={styles.bottom}>
          {isLogin ? (
            <NavLink to={REGISTRATION_ROUTE}>Registration</NavLink>
          ) : (
            <NavLink to={LOGIN_ROUTE}>login</NavLink>
          )}
          <Button type="submit">{isLogin ? "Login" : "registration"}</Button>
        </div>
      </form>
      <button onClick={onClick}>refresh</button>
      <button onClick={logoutClick}>logout</button>
    </div>
  );
});

export default Auth;
