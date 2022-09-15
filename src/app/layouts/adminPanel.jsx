import React, { useEffect } from "react";
import { Link } from "react-router-dom";
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
import CoffeeTable from "../components/common/table/coffeeTable";

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
  // const brands = useSelector(getBrandsList());
  const brandsLoadingStatus = useSelector(getBrandsLoadingStatus());
  // const countries = useSelector(getCountriesList());
  const countriesLoadingStatus = useSelector(getCountriesLoadingStatus());
  // const methods = useSelector(getMethodsList());
  const methodsLoadingStatus = useSelector(getMethodsLoadingStatus());
  // const kinds = useSelector(getKindsList());
  const kindsLoadingStatus = useSelector(getKindsLoadingStatus());
  const coffeeItem = useSelector(getCoffeeItemsList());

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
        <Link className="fs-2 ms-4" to={"/adminPanel/createCoffeeItem"}>
          +
        </Link>
        <CoffeeTable coffeeItems={coffeeItem} />
        {/* {data.map((i) => (
        <div className="ms-4 d-flex align-items-center" key={i._id}>
          <p className="mx-2">{i.grade}</p>
          <p className="mx-2">{i.description}</p>
          <p className="mx-2">{i.price.kg} &#8381;</p>
          <button className="mx-2"><Link to={`/adminPanel/${i._id}`}>Edit</Link></button>
        </div>
      ))} */}
      </>
    );
  }
};

export default AdminPanel;
