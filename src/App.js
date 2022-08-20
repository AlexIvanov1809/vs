import React, { useState } from "react";
import CoffeeItems from "./components/coffeeItems";
import api from "./api";

function App() {
  const [coffeeAssortment] = useState(api.coffeeItems);
  return (
    <div className="m-2">
      <CoffeeItems assortment={coffeeAssortment} />
    </div>
  );
}

export default App;
