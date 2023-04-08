import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { UserStore, ProductStore, OrderStore } from "./store/";

// контекст нужно хранить в отдельном файле и крайне желательно передавать в него нормальное дэфолтное значение
// название переменной крайне плохое. Если этот контекст является ассоциацией с хранилищем, то так его и нужно называть: StoreContext
// Вообще весь провайдер лучше вынести в отдельный файл, чтобы вся логика хранилища (импорты, инициализация, были там)
export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Context.Provider
      value={{
        user: new UserStore(),
        // почему products во множественном, если ProductStore в единственном числе?
        products: new ProductStore(),
        // почему basket, если класс - Order?
        basket: new OrderStore(),
      }}
    >
      <App />
    </Context.Provider>
  </React.StrictMode>,
);
