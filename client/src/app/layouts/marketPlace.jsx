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
  const [hidden, setHidden] = useState(true);
  const [firstOrder, setFirstOrder] = useState(true);
  useEffect(() => {
    dispatch(loadCoffeeItemsList());
    dispatch(loadTeaItemsList());
  }, []);
  const isloading = useSelector(getCoffeeItemsLoadingStatus());
  const error = useSelector(getCoffeeItemsError());

  const hendleClick = (page) => {
    setCurrentPage(page);
  };
  const handleOrder = (type) => {
    if (firstOrder) {
      if (type === "continue") {
        setHidden(true);
        setFirstOrder(false);
      } else {
        setHidden(false);
      }
    }
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
        {currentPage === "coffee" ? (
          <CoffeeMarket handleOrder={handleOrder} />
        ) : (
          <TeaMarket handleOrder={handleOrder} />
        )}
        <div
          className={hidden ? "d-none" : "position-absolute text-center"}
          style={{ top: "5rem", right: "1rem" }}
        >
          <p>ТОВАР ДОБАВЛЕН В КОРЗИНУ</p>
          <div className="m-auto text-center bg-white p-4 zindex-dropdown d-flex flex-column">
            <Link to={"/basket"} className="btn btn-primary mb-3">
              Перейти в корзину
            </Link>
            <button
              className="btn btn-primary"
              onClick={() => handleOrder("continue")}
            >
              Продолжить покупки
            </button>
          </div>
        </div>
      </>
    );
  }
  return <h1>{error}</h1>;
};

export default MarketPlace;
