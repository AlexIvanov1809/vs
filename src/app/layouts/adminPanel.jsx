import React, { useEffect } from "react";
// import AdminCoffeePage from "../components/pages/adminCoffeePage/adminCoffeePage";
import { useDispatch } from "react-redux";
// import { loadCoffeeItemsList } from "../store/coffeeItems/coffeeItems";
import { loadTeaItemsList } from "../store/teaItems/teaItems";
import AdminTeaPage from "../components/pages/adminTeaPage/adminTeaPage";

const AdminPanel = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(loadCoffeeItemsList());
    dispatch(loadTeaItemsList());
  }, []);
  return (
    <>
      {/* <AdminCoffeePage />; */}
      <AdminTeaPage />
    </>
  );
};

export default AdminPanel;
