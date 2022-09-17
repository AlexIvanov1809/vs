import React, { useState } from "react";
import PropTypes from "prop-types";

const WeightItem = ({ item, onChange }) => {
  const state = {
    quarter: true,
    kg: false,
    drip: false
  };
  const [opacity, setOpacity] = useState(state);

  const hiddenChecker = (item) => {
    if (!item) {
      return true;
    } else {
      return false;
    }
  };
  const handleOpacity = (id, item) => {
    onChange(id, item);
    const trueItem = Object.keys(opacity).find((k) => opacity[k] === true);
    setOpacity({ ...opacity, [trueItem]: false, [item]: true });
  };
  return (
    <>
      <div className="d-flex">
        <div
          className={
            "prise ms-2 text-center" +
            (opacity.quarter ? "" : " text-black text-opacity-50 ")
          }
          hidden={hiddenChecker(item.price.quarter)}
          onClick={() => handleOpacity(item._id, "quarter")}
          role="button"
        >
          <h6>250</h6>
          <span>{item.price.quarter} &#8381;</span>
        </div>
        <div
          className={
            "prise mx-4 text-center" +
            (opacity.kg ? "" : " text-black text-opacity-50")
          }
          hidden={hiddenChecker(item.price.kg)}
          onClick={() => handleOpacity(item._id, "kg")}
          role="button"
        >
          <h6>1000</h6>
          <span>{item.price.kg} &#8381;</span>
        </div>
        <div
          className={
            "prise text-center" +
            (opacity.drip ? "" : " text-black text-opacity-50")
          }
          hidden={hiddenChecker(item.price.drip)}
          onClick={() => handleOpacity(item._id, "drip")}
          role="button"
        >
          <h6>шт</h6>
          <span>{item.price.drip} &#8381;</span>
        </div>
      </div>
    </>
  );
};

WeightItem.propTypes = {
  item: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
};

export default WeightItem;
