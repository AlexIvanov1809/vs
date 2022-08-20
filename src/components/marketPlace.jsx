import React from "react";
import CoffeeItems from "./coffeeItems";

const MarketPlace = ({ assortment }) => {
  return (
    <>
      <CoffeeItems assortment={assortment} />
    </>
  );
};

export default MarketPlace;
