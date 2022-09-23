import React, { useState, useEffect } from "react";
import CoffeeMarket from "../components/pages/coffeePages/coffeeMarket";
import { loadCoffeeItemsList } from "../store/coffeeItems/coffeeItems";
import { loadTeaItemsList } from "../store/teaItems/teaItems";
import { useDispatch } from "react-redux";
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

  const hendleClick = (page) => {
    setCurrentPage(page);
  };
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
};

export default MarketPlace;
