import React from "react";
import PropTypes from "prop-types";
import WeightItem from "../ui/weightItem";
// import ItemImage from "../ui/itemImage";

const CoffeePage = ({ assortment, onChange }) => {
  return (
    <>
      <div className="d-flex flex-wrap justify-content-center">
        {assortment.map((item) => (
          <div
            key={item._id}
            className="div m-2 h-100 text-center border p-2"
            style={{ width: "350px" }}
          >
            <h4>{item.brand}</h4>
            <p>{item.preparationMethod}</p>
            <h2>
              {item.country} {item.sortName}
            </h2>
            <p>{item.kind}</p>
            {/* <ItemImage item={item} /> */}
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
