import React from "react";
import { Route, Routes } from "react-router-dom";
import MarketPlace from "./layouts/marketPlace";
import Main from "./layouts/main";
import Login from "./layouts/login";
import NavBar from "./components/common/navBar";
import AdminPanel from "./layouts/adminPanel";
import EditCoffeeItem from "./components/pages/editCoffeeItem/editCoffeeItem";
import CreateCoffeeItem from "./components/pages/createCoffeeItem/createCoffeeItem";
import CreateTeaItem from "./components/pages/createTeaItem/createTeaItem";
import EditTeaItem from "./components/pages/editTeaItem/editTeaItem";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" exact element={<Main />} />
        <Route path="/market" exact element={<MarketPlace />} />
        <Route path="/market/:itemId" exact element={<MarketPlace />} />
        <Route path="/adminPanel" element={<AdminPanel />} />
        <Route
          path="/adminPanel/coffee/create"
          element={<CreateCoffeeItem />}
        />
        <Route path="/adminPanel/tea/create" element={<CreateTeaItem />} />
        <Route path="/adminPanel/coffee/:itemId" element={<EditCoffeeItem />} />
        <Route path="/adminPanel/tea/:itemId" element={<EditTeaItem />} />
        {/* <Route path="/login" exact element={<Login />} /> */}
        <Route path="/:type" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
