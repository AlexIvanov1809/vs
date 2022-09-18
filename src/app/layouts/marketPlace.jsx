import React, { useState, useEffect } from "react";
import CoffeeCardItem from "../components/pages/coffeeCardItem";
import Pagination from "../components/common/pagination";
import { paginate } from "../utils/pagination";
// import GroupList from "../components/common/groupList";
import { useDispatch, useSelector } from "react-redux";
import {
  getCoffeeItemsList,
  getCoffeeItemsLoadingStatus,
  loadCoffeeItemsList
} from "../store/coffeeItems";
import {
  getCountriesLoadingStatus,
  loadCountriesList
} from "../store/countries";
import { getBrandsLoadingStatus, loadbrandsList } from "../store/brands";
import { getMethodsLoadingStatus, loadmethodsList } from "../store/methods";
import { getKindsLoadingStatus, loadkindsList } from "../store/kinds";
import CountersList from "../components/common/counters/countersList";

const MarketPlace = () => {
  const [coffeeAssortment, setCoffeeAssortment] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCountry] = useState("");
  const [keyFilter] = useState("");
  const [orderItems, setOrderItems] = useState([]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadCoffeeItemsList());
    dispatch(loadbrandsList());
    dispatch(loadCountriesList());
    dispatch(loadmethodsList());
    dispatch(loadkindsList());
  }, []);
  const coffeeItems = useSelector(getCoffeeItemsList());

  const coffeeItemsLoading = useSelector(getCoffeeItemsLoadingStatus());
  const brandsLoadingStatus = useSelector(getBrandsLoadingStatus());
  const countriesLoadingStatus = useSelector(getCountriesLoadingStatus());
  const methodsLoadingStatus = useSelector(getMethodsLoadingStatus());
  const kindsLoadingStatus = useSelector(getKindsLoadingStatus());

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

  const handleOrderItems = (item) => {
    let same = false;
    orderItems.map((i) => {
      if (i._id === item._id && i.price === item.price) {
        same = true;
      }
      return i;
    });
    if (!same) {
      orderItems.push(item);
    } else {
      const index = orderItems.findIndex(
        (i) => i._id === item._id && i.price === item.price
      );
      orderItems[index] = item;
    }
    setOrderItems(orderItems);
  };
  // const handleCountrySelect = (value, item) => {
  //   setSelectedCountry(value);
  //   setKeyFilter(item);
  // };

  const pageSize = 4;

  const filteredCountries = selectedCountry
    ? coffeeAssortment.filter((item) => item[keyFilter] === selectedCountry)
    : coffeeAssortment;

  const itemsQty = filteredCountries.length;
  const itemsOnPage = paginate(filteredCountries, currentPage, pageSize);
  // const handleResetFilter = () => {
  //   setSelectedCountry("");
  // };
  if (
    !coffeeItemsLoading ||
    !brandsLoadingStatus ||
    !countriesLoadingStatus ||
    !methodsLoadingStatus ||
    !kindsLoadingStatus
  ) {
    return (
      <div className="d-flex">
        <aside className="border h-100 mt-2 mx-2 text-center ">
          <div style={{ width: "25rem" }}>
            <CountersList orderItems={orderItems} />
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
            {/* <button className="btn btn-primary m-2" onClick={handleResetFilter}>
              Reset
            </button> */}
          </div>
        </aside>

        <div className="w-100 mt-5 d-flex flex-wrap justify-content-center">
          {itemsOnPage.map((item) => (
            <CoffeeCardItem
              key={item._id}
              coffeeItem={item}
              onChange={handleOrderItems}
            />
          ))}
          <div className="w-100">
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
  } else {
    return (
      <div className="d-flex justify-content-center w-100 mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
};

export default MarketPlace;
