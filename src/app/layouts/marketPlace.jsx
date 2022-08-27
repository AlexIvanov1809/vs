import React, { useState, useEffect } from "react";
import CoffeePage from "../components/pages/coffeePage";
import api from "../api";
import Pagination from "../components/common/pagination";
import { paginate } from "../utils/pagination";
import GroupList from "../components/common/groupList";

const MarketPlace = () => {
  const [coffeeAssortment, setCoffeeAssortment] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCountry, setSelectedCountry] = useState();

  useEffect(() => {
    api.coffeeItems.fetchAll().then((data) => setCoffeeAssortment(data));
  }, []);

  const countriesItems = [];
  coffeeAssortment.map((item) => countriesItems.push(item.country));
  const countries = countriesItems
    .filter((item, index) => countriesItems.indexOf(item) === index)
    .filter(Boolean);

  const handleCurrentPageSet = (page) => {
    setCurrentPage(page);
  };

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
  };

  const handleToggleChengeweightItem = (id, weight) => {
    setCoffeeAssortment(
      coffeeAssortment.map((item) => {
        if (item.id === id) {
          if (!item.weight[weight]) {
            return {
              ...item,
              weight: { quarter: !item.weight.quarter, kg: !item.weight.kg }
            };
          }
        }

        return item;
      })
    );
  };

  const pageSize = 3;
  const filteredCountries = selectedCountry
    ? coffeeAssortment.filter((item) => item.country === selectedCountry)
    : coffeeAssortment;
  const itemsQty = filteredCountries.length;
  const itemsOnPage = paginate(filteredCountries, currentPage, pageSize);
  const handleResetFilter = () => {
    setSelectedCountry();
  };
  return (
    <div className="d-flex">
      <div className="w-25 mt-2 ms-2">
        <GroupList
          countries={countries}
          selectedCountry={selectedCountry}
          onSelectCountry={handleCountrySelect}
        />
        <button className="btn btn-primary m-2" onClick={handleResetFilter}>
          Reset
        </button>
      </div>
      <div>
        <CoffeePage
          assortment={itemsOnPage}
          onChange={handleToggleChengeweightItem}
        />
        <div className="d-flex justify-content-center">
          <Pagination
            itemsQty={itemsQty}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handleCurrentPageSet}
          />
        </div>
      </div>
    </div>
  );
};

export default MarketPlace;
