import React, { useState, useEffect } from "react";
import CoffeePage from "../components/pages/coffeePage";
import Pagination from "../components/common/pagination";
import { paginate } from "../utils/pagination";
// import GroupList from "../components/common/groupList";
import { useDispatch, useSelector } from "react-redux";
import {
  getCoffeeItemsList,
  // getCoffeeItemsLoadingStatus,
  loadCoffeeItemsList
} from "../store/coffeeItems";
import {
  // getCountriesList,
  // getCountriesLoadingStatus,
  loadCountriesList
} from "../store/countries";
import {
  // getBrandsList,
  // getBrandsLoadingStatus,
  loadbrandsList
} from "../store/brands";
import {
  // getMethodsList,
  // getMethodsLoadingStatus,
  loadmethodsList
} from "../store/methods";
import {
  // getKindsList,
  // getKindsLoadingStatus,
  loadkindsList
} from "../store/kinds";

const MarketPlace = () => {
  const [coffeeAssortment, setCoffeeAssortment] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCountry] = useState("");
  const [keyFilter] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadCoffeeItemsList());
    dispatch(loadbrandsList());
    dispatch(loadCountriesList());
    dispatch(loadmethodsList());
    dispatch(loadkindsList());
  }, []);
  const coffeeItems = useSelector(getCoffeeItemsList());
  // const coffeeItemsLoading = useSelector(getCoffeeItemsLoadingStatus());
  // const brands = useSelector(getBrandsList());
  // const brandsLoadingStatus = useSelector(getBrandsLoadingStatus());
  // const countries = useSelector(getCountriesList());
  // const countriesLoadingStatus = useSelector(getCountriesLoadingStatus());
  // const methods = useSelector(getMethodsList());
  // const methodsLoadingStatus = useSelector(getMethodsLoadingStatus());
  // const kinds = useSelector(getKindsList());
  // const kindsLoadingStatus = useSelector(getKindsLoadingStatus());

  // const countriesItems = coffeeItems.map((item) => item.country);
  // const formItems = coffeeItems.map((item) => item.form);

  useEffect(() => {
    if (coffeeItems) {
      setCoffeeAssortment(coffeeItems);
    }
  }, [coffeeItems]);
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCountry]);

  const handleCurrentPageSet = (page) => {
    setCurrentPage(page);
  };

  // const handleCountrySelect = (value, item) => {
  //   setSelectedCountry(value);
  //   setKeyFilter(item);
  // };

  const handleToggleChengeweightItem = (id, name) => {
    setCoffeeAssortment(
      coffeeAssortment.map((item) => {
        if (item._id === id) {
          console.log(name);
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
    // setSelectedCountry("");
  };
  return (
    <div className="d-flex">
      <aside className="border h-100 mt-2 mx-2 text-center ">
        <div style={{ width: "15rem" }}>
          {/* <GroupList
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
          /> */}
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
