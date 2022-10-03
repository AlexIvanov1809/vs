import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Entity from "../../ui/entity";
import {
  createNewTeaTypesItem,
  getTeaTypesList,
  getTeaTypesLoadingStatus,
  loadTeaTypesList,
  teaTypesRemove
} from "../../../store/teaItems/teaType";
import {
  getTeaItemsList,
  getTeaItemsLoadingStatus
} from "../../../store/teaItems/teaItems";
import TeaTable from "../../common/table/teaTable";
import {
  createNewTeaBrandsItem,
  getTeaBrandsList,
  getTeaBrandsLoadingStatus,
  loadTeaBrandsList,
  teaBrandsRemove
} from "../../../store/teaItems/teaBrands";
import {
  createNewTeaPackagesItem,
  getTeaPackagesList,
  getTeaPackagesLoadingStatus,
  loadTeaPackagesList,
  teaPackagesRemove
} from "../../../store/teaItems/teaPackages";

const AdminTeaPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadTeaTypesList());
    dispatch(loadTeaBrandsList());
    dispatch(loadTeaPackagesList());
  }, []);
  const teaItemsLoading = useSelector(getTeaItemsLoadingStatus());
  const teaTypesLoading = useSelector(getTeaTypesLoadingStatus());
  const teaBrandsLoading = useSelector(getTeaBrandsLoadingStatus());
  const teaPackagesLoading = useSelector(getTeaPackagesLoadingStatus());
  const teaTypes = useSelector(getTeaTypesList());
  const teaItems = useSelector(getTeaItemsList());
  const teaBrands = useSelector(getTeaBrandsList());
  const teaPackages = useSelector(getTeaPackagesList());

  const handleDelete = (id, name) => {
    const items = {
      teaTypes: teaTypesRemove(id),
      teaBrands: teaBrandsRemove(id),
      teaPackages: teaPackagesRemove(id)
    };
    dispatch(items[name]);
  };

  const handleSubmit = (value) => {
    const ItemName = Object.keys(value);
    const addItem = {
      value: value[ItemName[0]]
    };
    const items = {
      teaTypes: createNewTeaTypesItem(addItem),
      teaBrands: createNewTeaBrandsItem(addItem),
      teaPackages: createNewTeaPackagesItem(addItem)
    };

    dispatch(items[ItemName]);
  };
  return (
    <>
      <div className="d-flex justify-content-between align-items-end">
        <div className="d-flex">
          <Entity
            loading={teaTypesLoading}
            items={teaTypes}
            label="Добавить вид чая"
            name="teaTypes"
            onDelete={handleDelete}
            onSubmit={handleSubmit}
          />
          <Entity
            loading={teaBrandsLoading}
            items={teaBrands}
            label="Добавить Бренд"
            name="teaBrands"
            onDelete={handleDelete}
            onSubmit={handleSubmit}
          />
          <Entity
            loading={teaPackagesLoading}
            items={teaPackages}
            label="Добавить вид упаковки"
            name="teaPackages"
            onDelete={handleDelete}
            onSubmit={handleSubmit}
          />
        </div>
        <button className="btn btn-white me-5 h-25">
          <Link className="text-primary fs-3" to={"/adminPanel/tea/create"}>
            <i className="bi bi-file-earmark-plus-fill"></i>
          </Link>
        </button>
      </div>
      {!teaItemsLoading ? (
        <TeaTable teaItems={teaItems} />
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

export default AdminTeaPage;
