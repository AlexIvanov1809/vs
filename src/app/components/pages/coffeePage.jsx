import React from "react";
import PropTypes from "prop-types";
import WeightItem from "../ui/weightItem";
import ItemImage from "../ui/itemImage";

const CoffeePage = ({ assortment, onChange }) => {
  return (
    <>
      <div className="d-flex flex-wrap justify-content-center">
        {assortment.map((item) => (
          <div
            key={item.id}
            className="div m-2 w-25 h-50 text-center border p-2"
          >
            <h4>{item.roasted}</h4>
            <p>{item.using}</p>
            <h2>
              {item.country} {item.sort}
            </h2>
            <p>{item.form}</p>
            <ItemImage image={item.image} />
            <p>{!item.grind ? "Beans" : "Grounded"}</p>
            <WeightItem item={item} onChange={onChange} />
          </div>
        ))}
      </div>
    </>
  );
};

CoffeePage.propTypes = {
  assortment: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired
};

export default CoffeePage;
