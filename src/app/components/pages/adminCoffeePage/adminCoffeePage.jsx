import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getCoffeeItemsList,
  getCoffeeItemsLoadingStatus
} from "../../../store/coffeeItems/coffeeItems";
import {
  countriesRemove,
  createNewCountriesItem,
  getCountriesList,
  getCountriesLoadingStatus,
  loadCountriesList
} from "../../../store/coffeeItems/countries";
import {
  brandsRemove,
  createNewBrandsItem,
  getBrandsList,
  getBrandsLoadingStatus,
  loadbrandsList
} from "../../../store/coffeeItems/brands";
import {
  createNewMethodsItem,
  getMethodsList,
  getMethodsLoadingStatus,
  loadmethodsList,
  methodsRemove
} from "../../../store/coffeeItems/methods";
import {
  createNewKindsItem,
  getKindsList,
  getKindsLoadingStatus,
  kindsRemove,
  loadkindsList
} from "../../../store/coffeeItems/kinds";
import CoffeeTable from "../../common/table/coffeeTable";
import Entity from "../../ui/entity";
import { nanoid } from "@reduxjs/toolkit";

const AdminCoffeePage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
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
  return (
    <>
      <div className="d-flex justify-content-between align-items-end">
        <div className="d-flex">
          <Entity
            loading={brandsLoadingStatus}
            items={brands}
            label="Добавить Бренд"
            name="brands"
            onDelete={handleDelete}
            onSubmit={handleSubmit}
          />
          <Entity
            loading={countriesLoadingStatus}
            items={countries}
            label="Добавить Страну"
            name="countries"
            onDelete={handleDelete}
            onSubmit={handleSubmit}
          />
          <Entity
            loading={kindsLoadingStatus}
            items={kinds}
            label="Добавить Сорт"
            name="kinds"
            onDelete={handleDelete}
            onSubmit={handleSubmit}
          />
          <Entity
            loading={methodsLoadingStatus}
            items={methods}
            label="Добавить Метод Обработки"
            name="methods"
            onDelete={handleDelete}
            onSubmit={handleSubmit}
          />
        </div>
        <button className="btn btn-white me-5 h-25">
          <Link
            className="text-primary fs-3"
            to={"/AdminCoffeePage/coffee/create"}
          >
            <i className="bi bi-file-earmark-plus-fill"></i>
          </Link>
        </button>
      </div>
      {!coffeeItemsLoading ? (
        <CoffeeTable coffeeItems={coffeeItems} />
      ) : (
        <div className="d-flex justify-content-center w-100 mt-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminCoffeePage;
