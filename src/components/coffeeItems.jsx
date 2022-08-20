import React from "react";
import PropTypes from "prop-types";

const CoffeeItems = ({ assortment }) => {
  console.log(assortment);
  return (
    <div className="d-flex flex-wrap">
      {assortment.map((item) => (
        <div key={item.id} className="m-2 w-25 h-50 text-center border">
          <p>{item.using}</p>
          <h2>{item.country}</h2>
          <h3>{item.sort}</h3>
          <p>{item.form}</p>
          <img
            className="w-50 h-50"
            src={"img/" + item.image + ".png"}
            alt="coffee box"
          />
          <p>{item.grind === false ? "Beans" : "Grounded"}</p>
          <h5>{item.prise + ".00 RUB"}</h5>
          <p>{item.weight + " gramm"}</p>
        </div>
      ))}
    </div>
  );
};

CoffeeItems.propTypes = {
  assortment: PropTypes.array.isRequired
};

export default CoffeeItems;
