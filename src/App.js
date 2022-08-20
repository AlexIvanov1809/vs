import React, { useState } from "react";
import MarketPlace from "./components/marketPlace";
import api from "./api";
import Header from "./components/header";

function App() {
  const [coffeeAssortment] = useState(api.coffeeItems);
  return (
    <>
      <Header />
      <div className="m-2">
        <MarketPlace assortment={coffeeAssortment} />
      </div>
    </>
  );
}

export default App;
