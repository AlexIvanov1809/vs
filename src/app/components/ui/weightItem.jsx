import React from "react";
import PropTypes from "prop-types";

const WeightItem = ({ item, onChange }) => {
  return (
    <>
      <div className="d-flex">
        <span
          className={
            "prise m-1" +
            (item.weight.quarter ? "" : " text-black text-opacity-50")
          }
          onClick={() => onChange(item.id, "quarter")}
          role="button"
        >
          250
        </span>
        <span
          className={
            "prise m-1" + (item.weight.kg ? "" : " text-black text-opacity-50")
          }
          onClick={() => onChange(item.id, "kg")}
          role="button"
        >
          1000
        </span>
      </div>
      <div className="d-flex">
        <span
          className={
            "prise m-1" +
            (item.weight.quarter ? "" : " text-black text-opacity-50")
          }
        >
          {item.prise.quarter + " RUB"}
        </span>
        <span
          className={
            "prise m-1" + (item.weight.kg ? "" : " text-black text-opacity-50")
          }
        >
          {item.prise.kg + " RUB"}
        </span>
      </div>
    </>
  );
};

WeightItem.propTypes = {
  item: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
};

export default WeightItem;
