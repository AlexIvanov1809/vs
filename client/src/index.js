import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { UserStore, ProductStore, OrderStore } from "./store/";

export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Context.Provider
      value={{
        user: new UserStore(),
        products: new ProductStore(),
        basket: new OrderStore(),
      }}
    >
      <App />
    </Context.Provider>
  </React.StrictMode>,
);
