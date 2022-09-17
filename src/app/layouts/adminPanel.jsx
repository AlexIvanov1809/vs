import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getCoffeeItemsList,
  getCoffeeItemsLoadingStatus,
  loadCoffeeItemsList
} from "../store/coffeeItems";
import {
  countriesRemove,
  createNewCountriesItem,
  getCountriesList,
  getCountriesLoadingStatus,
  loadCountriesList
} from "../store/countries";
import {
  brandsRemove,
  createNewBrandsItem,
  getBrandsList,
  getBrandsLoadingStatus,
  loadbrandsList
} from "../store/brands";
import {
  createNewMethodsItem,
  getMethodsList,
  getMethodsLoadingStatus,
  loadmethodsList,
  methodsRemove
} from "../store/methods";
import {
  createNewKindsItem,
  getKindsList,
  getKindsLoadingStatus,
  kindsRemove,
  loadkindsList
} from "../store/kinds";
import CoffeeTable from "../components/common/table/coffeeTable";
import Entity from "../components/ui/entity";
import { nanoid } from "@reduxjs/toolkit";

const AdminPanel = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadCoffeeItemsList());
    dispatch(loadbrandsList());
    dispatch(loadCountriesList());
    dispatch(loadmethodsList());
    dispatch(loadkindsList());
  }, []);

  const coffeeItemsLoading = useSelector(getCoffeeItemsLoadingStatus());
  const brands = useSelector(getBrandsList());
  const brandsLoadingStatus = useSelector(getBrandsLoadingStatus());
  const countries = useSelector(getCountriesList());
  const countriesLoadingStatus = useSelector(getCountriesLoadingStatus());
  const methods = useSelector(getMethodsList());
  const methodsLoadingStatus = useSelector(getMethodsLoadingStatus());
  const kinds = useSelector(getKindsList());
  const kindsLoadingStatus = useSelector(getKindsLoadingStatus());
  const coffeeItems = useSelector(getCoffeeItemsList());

  const handleDelete = (id, name) => {
    const items = {
      brands: brandsRemove(id),
      countries: countriesRemove(id),
      kinds: kindsRemove(id),
      methods: methodsRemove(id)
    };
    dispatch(items[name]);
  };

  const handleSubmit = (value) => {
    const ItemName = Object.keys(value);
    const addItem = {
      _id: nanoid(),
      value: value[ItemName[0]]
    };
    const items = {
      brands: createNewBrandsItem(addItem),
      countries: createNewCountriesItem(addItem),
      kinds: createNewKindsItem(addItem),
      methods: createNewMethodsItem(addItem)
    };

    dispatch(items[ItemName]);
  };
  if (
    brandsLoadingStatus ||
    countriesLoadingStatus ||
    methodsLoadingStatus ||
    kindsLoadingStatus ||
    coffeeItemsLoading
  ) {
    return "Loading...";
  } else {
    return (
      <>
        <div className="d-flex justify-content-between align-items-end">
          <div className="d-flex">
            <Entity
              items={brands}
              label="Добавить Бренд"
              name="brands"
              onDelete={handleDelete}
              onSubmit={handleSubmit}
            />
            <Entity
              items={countries}
              label="Добавить Страну"
              name="countries"
              onDelete={handleDelete}
              onSubmit={handleSubmit}
            />
            <Entity
              items={kinds}
              label="Добавить Сорт"
              name="kinds"
              onDelete={handleDelete}
              onSubmit={handleSubmit}
            />
            <Entity
              items={methods}
              label="Добавить Метод Обработки"
              name="methods"
              onDelete={handleDelete}
              onSubmit={handleSubmit}
            />
          </div>
          <button className="btn btn-primary me-5 h-25">
            <Link
              className="text-white fs-3"
              to={"/adminPanel/createCoffeeItem"}
            >
              <i className="bi bi-file-earmark-plus-fill"></i>
            </Link>
          </button>
        </div>
        <CoffeeTable coffeeItems={coffeeItems} />
      </>
    );
  }
};

export default AdminPanel;
