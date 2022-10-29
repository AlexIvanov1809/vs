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
        <div className="position-relative w-100 mx-md-5 mx-ms-1 ">
          <div className="d-flex justify-content-center">
            <Link
              className={
                "m-2 w-50 btn btn-" +
                (currentPage === "coffee" ? "primary" : "secondary")
              }
              role="button"
              onClick={() => hendleClick("coffee")}
              to={"/market/coffee"}
            >
              Кофе
            </Link>
            <Link
              className={
                "m-2 w-50 btn btn-" +
                (currentPage === "tea" ? "primary" : "secondary")
              }
              role="button"
              onClick={() => hendleClick("tea")}
              to={"/market/tea"}
            >
              Чай
            </Link>
          </div>

          {currentPage === "coffee" ? (
            <CoffeeMarket handleOrder={handleOrder} />
          ) : (
            <TeaMarket handleOrder={handleOrder} />
          )}

          <div
            className={
              hidden
                ? "d-none"
                : "position-fixed top-50 start-50 translate-middle"
            }
          >
            <div className="card p-4 shadow">
              <span className="fw-bold">ТОВАР ДОБАВЛЕН В КОРЗИНУ</span>
              <div className="m-auto text-center  p-4 zindex-dropdown d-flex flex-column">
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
          </div>
        </div>
      </>
    );
  }
  return <h1>{error}</h1>;
};

export default MarketPlace;
