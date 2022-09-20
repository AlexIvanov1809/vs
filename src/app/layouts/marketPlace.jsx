import React, { useState, useEffect } from "react";
import CoffeeCardItem from "../components/pages/coffeeCardItem";
import Pagination from "../components/common/pagination";
import { paginate } from "../utils/pagination";
import { useDispatch, useSelector } from "react-redux";
import {
  getCoffeeItemsList,
  getCoffeeItemsLoadingStatus,
  loadCoffeeItemsList
} from "../store/coffeeItems";
import {
  getCountriesList,
  getCountriesLoadingStatus,
  loadCountriesList
} from "../store/countries";
import { getBrandsLoadingStatus, loadbrandsList } from "../store/brands";
import { getMethodsLoadingStatus, loadmethodsList } from "../store/methods";
import { getKindsLoadingStatus, loadkindsList } from "../store/kinds";
// import CountersList from "../components/common/counters/countersList";
import GroupList from "../components/common/groupList";

const MarketPlace = () => {
  const [coffeeAssortment, setCoffeeAssortment] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState([]);
  const pageSize = 6;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadCoffeeItemsList());
    dispatch(loadbrandsList());
    dispatch(loadCountriesList());
    dispatch(loadmethodsList());
    dispatch(loadkindsList());
  }, []);
  const coffeeItems = useSelector(getCoffeeItemsList());
  const countries = useSelector(getCountriesList());

  const coffeeItemsLoading = useSelector(getCoffeeItemsLoadingStatus());
  const brandsLoadingStatus = useSelector(getBrandsLoadingStatus());
  const countriesLoadingStatus = useSelector(getCountriesLoadingStatus());
  const methodsLoadingStatus = useSelector(getMethodsLoadingStatus());
  const kindsLoadingStatus = useSelector(getKindsLoadingStatus());

  // const countriesItems = coffeeItems.map((item) => item.country);
  // const formItems = coffeeItems.map((item) => item.form);

  useEffect(() => {
    if (coffeeItems) {
      const activeCoffeeItems = coffeeItems.filter((i) => i.active);
      setCoffeeAssortment(activeCoffeeItems);
    }
  }, [coffeeItems]);
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const handleCurrentPageSet = (page) => {
    setCurrentPage(page);
  };

  const handleSearchQuery = ({ target }) => {
    setSearchQuery(target.value);
  };

  const handleFilteredItems = (items) => {
    setFilter([]);
    items.forEach((item) =>
      setFilter((p) => [
        ...p,
        ...coffeeAssortment.filter((i) => i.country === item)
      ])
    );
  };
  console.log(filter);
  // filter.length > 0? data.filter((item) => item.country === filter[0]
  function searchItems(data) {
    const filtredData = searchQuery
      ? (filter.length > 0 ? filter : data).filter(
          (item) =>
            item.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1
        )
      : filter.length > 0
      ? filter
      : data;
    return filtredData;
  }

  const filtereditems = searchItems(coffeeAssortment);

  const itemsQty = filtereditems.length;
  const itemsOnPage = paginate(filtereditems, currentPage, pageSize);

  if (
    !coffeeItemsLoading ||
    !brandsLoadingStatus ||
    !countriesLoadingStatus ||
    !methodsLoadingStatus ||
    !kindsLoadingStatus
  ) {
    return (
      <div className="d-flex">
        <div>
          <GroupList onFilter={handleFilteredItems} items={countries} />
        </div>
        <aside className="border h-100 mt-2 mx-2 text-center ">
          {/* <div style={{ width: "25rem" }}>
            <CountersList /> */}
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
          {/* </div> */}
        </aside>
        <div>
          <input
            type="text"
            name="searchQuery"
            placeholder="Search..."
            onChange={handleSearchQuery}
            value={searchQuery}
          />
          <div className="w-100 mt-5 d-flex flex-wrap justify-content-center">
            {itemsOnPage.map((item) => (
              <CoffeeCardItem key={item._id} coffeeItem={item} />
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
