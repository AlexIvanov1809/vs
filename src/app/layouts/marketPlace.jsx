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
import {
  getBrandsList,
  getBrandsLoadingStatus,
  loadbrandsList
} from "../store/brands";
import {
  getMethodsList,
  getMethodsLoadingStatus,
  loadmethodsList
} from "../store/methods";
import {
  getKindsList,
  getKindsLoadingStatus,
  loadkindsList
} from "../store/kinds";
import GroupList from "../components/common/groupList";

const MarketPlace = () => {
  const [coffeeAssortment, setCoffeeAssortment] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState([]);
  const [selectedItems, setSelectedItems] = useState({
    brand: [],
    country: [],
    method: [],
    kind: []
  });
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

  const coffeeItemsLoading = useSelector(getCoffeeItemsLoadingStatus());
  const brandsLoadingStatus = useSelector(getBrandsLoadingStatus());
  const countriesLoadingStatus = useSelector(getCountriesLoadingStatus());
  const methodsLoadingStatus = useSelector(getMethodsLoadingStatus());
  const kindsLoadingStatus = useSelector(getKindsLoadingStatus());
  const countries = useSelector(getCountriesList());
  const brands = useSelector(getBrandsList());
  const methods = useSelector(getMethodsList());
  const kinds = useSelector(getKindsList());

  useEffect(() => {
    if (coffeeItems) {
      const activeCoffeeItems = coffeeItems.filter((i) => i.active);
      setCoffeeAssortment(activeCoffeeItems);
    }
  }, [coffeeItems]);
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);
  useEffect(() => {
    setFilter([]);
    const selected = {
      brand: [],
      country: [],
      method: [],
      kind: []
    };
    selectedItems.country.length > 0
      ? selectedItems.country.forEach(
          (item) =>
            (selected.country = [
              ...selected.country,
              ...coffeeAssortment.filter((i) => i.country === item)
            ])
        )
      : (selected.country = coffeeAssortment);

    selectedItems.brand.length > 0
      ? selectedItems.brand.forEach(
          (item) =>
            (selected.brand = [
              ...selected.brand,
              ...selected.country.filter((i) => i.brand === item)
            ])
        )
      : (selected.brand = selected.country);

    selectedItems.method.length > 0
      ? selectedItems.method.forEach(
          (item) =>
            (selected.method = [
              ...selected.method,
              ...selected.brand.filter((i) => i.method === item)
            ])
        )
      : (selected.method = selected.brand);

    selectedItems.kind.length > 0
      ? selectedItems.kind.forEach(
          (item) =>
            (selected.kind = [
              ...selected.kind,
              ...selected.method.filter((i) => i.kind === item)
            ])
        )
      : (selected.kind = selected.method);
    setFilter(selected.kind);
  }, [selectedItems]);

  const handleCurrentPageSet = (page) => {
    setCurrentPage(page);
  };

  const handleSearchQuery = ({ target }) => {
    setSearchQuery(target.value);
  };

  const handleFiltered = (items) => {
    setSelectedItems((prevState) => ({ ...prevState, ...items }));
  };

  function searchItems(data) {
    const filtredData = searchQuery
      ? data.filter(
          (item) =>
            item.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1
        )
      : data;

    return filtredData;
  }

  const filtereditems = searchItems(filter);

  const itemsQty = filtereditems.length;
  const itemsOnPage = paginate(filtereditems, currentPage, pageSize);

  if (
    !coffeeItemsLoading &&
    !brandsLoadingStatus &&
    !countriesLoadingStatus &&
    !methodsLoadingStatus &&
    !kindsLoadingStatus
  ) {
    return (
      <div className="d-flex">
        <aside className="border h-100 mt-2 mx-2" style={{ width: "300px" }}>
          {!brandsLoadingStatus && (
            <div className=" p-3">
              <GroupList
                value="Бренд"
                name="brand"
                onFilter={handleFiltered}
                items={brands}
              />
            </div>
          )}
          {!countriesLoadingStatus && (
            <div className=" p-3">
              <GroupList
                value="страна произростания"
                name="country"
                onFilter={handleFiltered}
                items={countries}
              />
            </div>
          )}
          {!methodsLoadingStatus && (
            <div className=" p-3">
              <GroupList
                value="Метод обработки"
                name="method"
                onFilter={handleFiltered}
                items={methods}
              />
            </div>
          )}
          {!kindsLoadingStatus && (
            <div className=" p-3">
              <GroupList
                value="Вид"
                name="kind"
                onFilter={handleFiltered}
                items={kinds}
              />
            </div>
          )}
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
