import React, { useState } from "react";
import PropTypes from "prop-types";
import ItemImage from "../ui/itemImage";
import { getBrandsList } from "../../store/brands";
import { getCountriesList } from "../../store/countries";
import { getMethodsList } from "../../store/methods";
import { getKindsList } from "../../store/kinds";
import { useSelector } from "react-redux";
import Scale from "../common/scale";
import PriceItem from "../ui/priceItem";
import BuyButton from "../common/buyButton";

const CoffeeCardItem = ({ coffeeItem }) => {
  const [img, setImg] = useState("quarter");
  const brands = useSelector(getBrandsList());
  const countries = useSelector(getCountriesList());
  const methods = useSelector(getMethodsList());
  const kinds = useSelector(getKindsList());
  const brand = brands.find((i) => i._id === coffeeItem.brand);
  const country = countries.find((i) => i._id === coffeeItem.country);
  const method = methods.find((i) => i._id === coffeeItem.method);
  const kind = kinds.find((i) => i._id === coffeeItem.kind);
  const HandleChangeImg = (name) => {
    setImg(name);
  };
  return (
    <>
      <div className="">
        <div
          className="div m-2 h-100 text-center border p-2"
          style={{ width: "350px" }}
        >
          <h4>{brand.value}</h4>
          <p>{coffeeItem.preparationMethod}</p>
          <h2>
            {country.value} {coffeeItem.sortName}
          </h2>
          <p>{method.value}</p>

          <ItemImage item={img} />
          <p>{kind.value}</p>

          <p>{coffeeItem.description}</p>

          <div className="d-flex justify-content-between">
            <Scale value={coffeeItem.acidity} name="Кислотность" />
            <Scale value={coffeeItem.density} name="Плотность" />
          </div>
          <p>{!coffeeItem.grind ? "Beans" : "Grounded"}</p>
          <div className="d-flex justify-content-between align-items-center">
            <PriceItem item={coffeeItem} onChange={HandleChangeImg} />
            <BuyButton />
          </div>
        </div>
      </div>
    </>
  );
};

CoffeeCardItem.propTypes = {
  coffeeItem: PropTypes.object
};

export default CoffeeCardItem;
