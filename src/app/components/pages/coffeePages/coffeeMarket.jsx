import React, { useState, useEffect } from "react";
import CoffeeCardItem from "../../ui/coffeeCardItem";
import Pagination from "../../common/pagination";
import { paginate } from "../../../utils/pagination";
import { useDispatch, useSelector } from "react-redux";
import {
  getCoffeeItemsList,
  getCoffeeItemsLoadingStatus
} from "../../../store/coffeeItems/coffeeItems";
import { loadCountriesList } from "../../../store/coffeeItems/countries";
import { loadbrandsList } from "../../../store/coffeeItems/brands";
import { loadmethodsList } from "../../../store/coffeeItems/methods";
import { loadkindsList } from "../../../store/coffeeItems/kinds";
import CoffeeSideBar from "../../common/coffeeSidebar";

const CoffeeMarket = () => {
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
    dispatch(loadbrandsList());
    dispatch(loadCountriesList());
    dispatch(loadmethodsList());
    dispatch(loadkindsList());
  }, []);
  const coffeeItems = useSelector(getCoffeeItemsList());

  const coffeeItemsLoading = useSelector(getCoffeeItemsLoadingStatus());

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

  const handleSelectedItems = (items) => {
    setSelectedItems(items);
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

  return (
    <div className="d-flex">
      <CoffeeSideBar onSelect={handleSelectedItems} />
      <div>
        <input
          type="text"
          name="searchQuery"
          placeholder="Search..."
          onChange={handleSearchQuery}
          value={searchQuery}
        />
        {!coffeeItemsLoading ? (
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
        ) : (
          <div className="d-flex justify-content-center w-100 mt-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoffeeMarket;
