import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import { observer } from "mobx-react-lite";
import { check } from "./http/userAPI";
import { Context } from ".";
import Loader from "./components/ui/Loader/Loader";
import getFromStorage from "./service/storage.service";
import NavBar from "./components/header/Navbar/Navbar";

const App = observer(() => {
  const { user, basket } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const productsInBasket = getFromStorage("venditore_basket");

    if (productsInBasket) {
      // эта логика находится не на своём месте. Она должен быть где-то в Basket
      basket.setOrder(productsInBasket);
    }

    // чтобы использовать промисы внутри эффекта в стиле async/await, можно обернуть в самовызывающуюся функцию:
    (async () => {
      try {
        const data = await check();

        user.setUser(data);
        user.setIsAuth(true);
      } finally {
        setLoading(false)
      }
    })();
  });

  if (loading) {
    return <Loader />;
  }
  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  );
});

export default App;
