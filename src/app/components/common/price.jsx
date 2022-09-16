import React from "react";

const Price = ({ price }) => {
  return (
    <div className="d-flex justify-content-evenly">
      {price.quarter ? <p>{price.quarter} &#8381;</p> : ""}
      {price.kg ? <p>{price.kg} &#8381;</p> : ""}
      {price.drip ? <p>{price.drip} &#8381;</p> : ""}
    </div>
  );
};

export default Price;
