import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import GroupList from "./groupList";
import { useSelector } from "react-redux";
import {
  getBrandsList,
  getBrandsLoadingStatus
} from "../../store/coffeeItems/brands";
import {
  getCountriesList,
  getCountriesLoadingStatus
} from "../../store/coffeeItems/countries";
import {
  getMethodsList,
  getMethodsLoadingStatus
} from "../../store/coffeeItems/methods";
import {
  getKindsList,
  getKindsLoadingStatus
} from "../../store/coffeeItems/kinds";

const SideBar = ({ onSelect }) => {
  const [reset, setReset] = useState(false);
  const [selectedItems, setSelectedItems] = useState({
    brand: [],
    country: [],
    method: [],
    kind: []
  });
  useEffect(() => {
    onSelect(selectedItems);
  }, [selectedItems]);
  const brandsLoadingStatus = useSelector(getBrandsLoadingStatus());
  const countriesLoadingStatus = useSelector(getCountriesLoadingStatus());
  const methodsLoadingStatus = useSelector(getMethodsLoadingStatus());
  const kindsLoadingStatus = useSelector(getKindsLoadingStatus());
  const countries = useSelector(getCountriesList());
  const brands = useSelector(getBrandsList());
  const methods = useSelector(getMethodsList());
  const kinds = useSelector(getKindsList());

  const handleFiltered = (items) => {
    setSelectedItems((prevState) => ({ ...prevState, ...items }));
  };

  const handleReset = () => {
    setSelectedItems({
      brand: [],
      country: [],
      method: [],
      kind: []
    });
    setReset(!reset);
  };
  return (
    <aside className="border h-100 mt-2 mx-2" style={{ width: "300px" }}>
      {!brandsLoadingStatus &&
      !countriesLoadingStatus &&
      !methodsLoadingStatus &&
      !kindsLoadingStatus ? (
        <>
          <div className=" p-3">
            <GroupList
              reset={reset}
              value="Бренд"
              name="brand"
              onFilter={handleFiltered}
              items={brands}
            />
          </div>
          <div className=" p-3">
            <GroupList
              reset={reset}
              value="страна произростания"
              name="country"
              onFilter={handleFiltered}
              items={countries}
            />
          </div>
          <div className=" p-3">
            <GroupList
              reset={reset}
              value="Метод обработки"
              name="method"
              onFilter={handleFiltered}
              items={methods}
            />
          </div>
          <div className=" p-3">
            <GroupList
              reset={reset}
              value="Вид"
              name="kind"
              onFilter={handleFiltered}
              items={kinds}
            />
          </div>
          <div className="w-100 d-flex justify-content-center mb-2">
            <button className="btn btn-primary" onClick={handleReset}>
              Reset
            </button>
          </div>
        </>
      ) : (
        <div className="d-flex justify-content-center w-100 mt-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </aside>
  );
};

SideBar.propTypes = {
  onSelect: PropTypes.func
};

export default SideBar;
