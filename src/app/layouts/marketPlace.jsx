import React, { useState, useEffect } from "react";
import CoffeePage from "../components/pages/coffeePage";
import api from "../api";
import Pagination from "../components/common/pagination";
import { paginate } from "../utils/pagination";
import GroupList from "../components/common/groupList";

const MarketPlace = () => {
  const [coffeeAssortment, setCoffeeAssortment] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [keyFilter, setKeyFilter] = useState("");

  const countriesItems = coffeeAssortment.map((item) => item.country);
  const formItems = coffeeAssortment.map((item) => item.form);

  useEffect(() => {
    api.coffeeItems.fetchAll().then((data) => setCoffeeAssortment(data));
  }, []);
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCountry]);

  const handleCurrentPageSet = (page) => {
    setCurrentPage(page);
  };

  const handleCountrySelect = (value, item) => {
    setSelectedCountry(value);
    setKeyFilter(item);
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
  const pageSize = 4;

  const filteredCountries = selectedCountry
    ? coffeeAssortment.filter((item) => item[keyFilter] === selectedCountry)
    : coffeeAssortment;

  const itemsQty = filteredCountries.length;
  const itemsOnPage = paginate(filteredCountries, currentPage, pageSize);
  const handleResetFilter = () => {
    setSelectedCountry("");
  };
  return (
    <div className="d-flex">
      <aside className="border h-100 mt-2 mx-2 text-center ">
        <div style={{ width: "15rem" }}>
          <GroupList
            groupItems={countriesItems}
            selectedCountry={selectedCountry}
            onSelectCountry={handleCountrySelect}
            name="country"
          />
          <GroupList
            groupItems={formItems}
            selectedCountry={selectedCountry}
            onSelectCountry={handleCountrySelect}
            name="form"
          />
          <button className="btn btn-primary m-2" onClick={handleResetFilter}>
            Reset
          </button>
        </div>
      </aside>
      {coffeeAssortment.length > 0 ? (
        <div className="w-100">
          <CoffeePage
            assortment={itemsOnPage}
            onChange={handleToggleChengeweightItem}
          />
          <div className="w-100">
            <Pagination
              itemsQty={itemsQty}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handleCurrentPageSet}
            />
          </div>
        </div>
      ) : (
        <div className="d-flex justify-content-center w-100 mt-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketPlace;
