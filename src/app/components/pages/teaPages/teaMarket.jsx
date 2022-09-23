import React, { useState, useEffect } from "react";
import Pagination from "../../common/pagination";
import { paginate } from "../../../utils/pagination";
import { useDispatch, useSelector } from "react-redux";
import { loadTeaBrandsList } from "../../../store/teaItems/teaBrands";
import { loadTeaTypesList } from "../../../store/teaItems/teaType";
import { loadTeaPackagesList } from "../../../store/teaItems/teaPackages";
import {
  getTeaItemsList,
  getTeaItemsLoadingStatus
} from "../../../store/teaItems/teaItems";
import TeaCardItem from "../../ui/teaCardItem";
import TeaSideBar from "../../common/teaSidebar";

const TeaMarket = () => {
  const [teaAssortment, setTeaAssortment] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState([]);
  const [selectedItems, setSelectedItems] = useState({
    brand: [],
    type: [],
    package: []
  });
  const pageSize = 6;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadTeaBrandsList());
    dispatch(loadTeaTypesList());
    dispatch(loadTeaPackagesList());
  }, []);
  const teaItems = useSelector(getTeaItemsList());
  const teaItemsLoading = useSelector(getTeaItemsLoadingStatus());

  useEffect(() => {
    if (teaItems) {
      const activeTeaItems = teaItems.filter((i) => i.active);
      setTeaAssortment(activeTeaItems);
    }
  }, [teaItems]);
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);
  useEffect(() => {
    setFilter([]);
    const selected = {
      brand: [],
      type: [],
      package: []
    };
    selectedItems.type.length > 0
      ? selectedItems.type.forEach(
          (item) =>
            (selected.type = [
              ...selected.type,
              ...teaAssortment.filter((i) => i.type === item)
            ])
        )
      : (selected.type = teaAssortment);

    selectedItems.brand.length > 0
      ? selectedItems.brand.forEach(
          (item) =>
            (selected.brand = [
              ...selected.brand,
              ...selected.type.filter((i) => i.brand === item)
            ])
        )
      : (selected.brand = selected.type);

    selectedItems.package.length > 0
      ? selectedItems.package.forEach(
          (item) =>
            (selected.package = [
              ...selected.package,
              ...selected.brand.filter((i) => i.package === item)
            ])
        )
      : (selected.package = selected.brand);
    setFilter(selected.package);
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
      <div className="h-100">
        <TeaSideBar onSelect={handleSelectedItems} />
      </div>
      <div>
        <input
          type="text"
          name="searchQuery"
          placeholder="Search..."
          onChange={handleSearchQuery}
          value={searchQuery}
        />
        {!teaItemsLoading ? (
          <div className="w-100 mt-5 d-flex flex-wrap justify-content-center">
            {itemsOnPage.map((item) => (
              <TeaCardItem key={item._id} teaItem={item} />
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

export default TeaMarket;
