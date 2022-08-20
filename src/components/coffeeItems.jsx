import React, { useState } from "react";
import PropTypes from "prop-types";
import Pagination from "./pagination";
import { paginate } from "../utils/pagination";
import api from "../api";
import GroupList from "./groupList";

const CoffeeItems = ({ assortment }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [countries] = useState(api.countries);
  const [selectedCountry, setSelectedCountry] = useState();

  const handleCurrentPageSet = (page) => {
    setCurrentPage(page);
  };
  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
  };

  const pageSize = 3;
  const filteredCountries =
    selectedCountry && selectedCountry._id
      ? assortment.filter((item) => item.country === selectedCountry)
      : assortment;
  const itemsQty = filteredCountries.length;
  const itemsOnPage = paginate(filteredCountries, currentPage, pageSize);
  const handleResetFilter = () => {
    setSelectedCountry();
  };
  return (
    <>
      <div className="w-25">
        <GroupList
          countries={countries}
          selectedCountry={selectedCountry}
          onSelectCountry={handleCountrySelect}
        />
        <button className="btn btn-primary m-2" onClick={handleResetFilter}>
          Reset
        </button>
      </div>
      <div className="d-flex flex-wrap justify-content-center">
        {itemsOnPage.map((item) => (
          <div key={item.id} className="m-2 w-25 h-50 text-center border p-2">
            <p>{item.using}</p>
            <h2>{item.country.name}</h2>
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
      <div className="d-flex justify-content-center">
        <Pagination
          itemsQty={itemsQty}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handleCurrentPageSet}
        />
      </div>
    </>
  );
};

CoffeeItems.propTypes = {
  assortment: PropTypes.array.isRequired
};

export default CoffeeItems;
