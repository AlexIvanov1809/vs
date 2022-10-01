import React, { useState, useEffect } from "react";
import CoffeeMarket from "../components/pages/coffeePages/coffeeMarket";
import {
  getCoffeeItemsError,
  getCoffeeItemsLoadingStatus,
  loadCoffeeItemsList
} from "../store/coffeeItems/coffeeItems";
import { loadTeaItemsList } from "../store/teaItems/teaItems";
import { useDispatch, useSelector } from "react-redux";
import TeaMarket from "../components/pages/teaPages/teaMarket";
import { Link, useParams } from "react-router-dom";

const MarketPlace = () => {
  const dispatch = useDispatch();
  const { store } = useParams();
  const [currentPage, setCurrentPage] = useState(store);
  useEffect(() => {
    dispatch(loadCoffeeItemsList());
    dispatch(loadTeaItemsList());
  }, []);
  const isloading = useSelector(getCoffeeItemsLoadingStatus());
  const error = useSelector(getCoffeeItemsError());

  const hendleClick = (page) => {
    setCurrentPage(page);
  };
  if (!error && !isloading) {
    return (
      <>
        <div className="d-flex text-start">
          <Link
            className={
              "m-2 btn btn-" +
              (currentPage === "coffee" ? "primary" : "secondary")
            }
            role="button"
            onClick={() => hendleClick("coffee")}
            to={"/market/coffee"}
          >
            Coffee
          </Link>
          <Link
            className={
              "m-2 btn btn-" + (currentPage === "tea" ? "primary" : "secondary")
            }
            role="button"
            onClick={() => hendleClick("tea")}
            to={"/market/tea"}
          >
            Tea
          </Link>
        </div>
        {currentPage === "coffee" ? <CoffeeMarket /> : <TeaMarket />}
      </>
    );
  }
  return <h1>{error}</h1>;
};

export default MarketPlace;
