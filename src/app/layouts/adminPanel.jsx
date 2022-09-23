import React, { useState, useEffect } from "react";
import AdminCoffeePage from "../components/pages/coffeePages/adminCoffeePage";
import { useDispatch } from "react-redux";
import { loadCoffeeItemsList } from "../store/coffeeItems/coffeeItems";
import { loadTeaItemsList } from "../store/teaItems/teaItems";
import AdminTeaPage from "../components/pages/teaPages/adminTeaPage";
import { useParams, Link } from "react-router-dom";

const AdminPanel = () => {
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
          to={"/adminPanel/coffee"}
        >
          Coffee
        </Link>
        <Link
          className={
            "m-2 btn btn-" + (currentPage === "tea" ? "primary" : "secondary")
          }
          role="button"
          onClick={() => hendleClick("tea")}
          to={"/adminPanel/tea"}
        >
          Tea
        </Link>
      </div>
      {currentPage === "coffee" ? <AdminCoffeePage /> : <AdminTeaPage />}
    </>
  );
};

export default AdminPanel;
