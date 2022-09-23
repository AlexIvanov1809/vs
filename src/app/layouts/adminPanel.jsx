import React, { useState, useEffect } from "react";
import AdminCoffeePage from "../components/pages/adminCoffeePage/adminCoffeePage";
import { useDispatch } from "react-redux";
import { loadCoffeeItemsList } from "../store/coffeeItems/coffeeItems";
import { loadTeaItemsList } from "../store/teaItems/teaItems";
import AdminTeaPage from "../components/pages/adminTeaPage/adminTeaPage";

const AdminPanel = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState("coffee");
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
        <span
          className={
            "m-2 btn btn-" +
            (currentPage === "coffee" ? "primary" : "secondary")
          }
          role="button"
          onClick={() => hendleClick("coffee")}
        >
          Coffee
        </span>
        <span
          className={
            "m-2 btn btn-" + (currentPage === "tea" ? "primary" : "secondary")
          }
          role="button"
          onClick={() => hendleClick("tea")}
        >
          Tea
        </span>
      </div>
      {currentPage === "coffee" ? <AdminCoffeePage /> : <AdminTeaPage />}
    </>
  );
};

export default AdminPanel;
