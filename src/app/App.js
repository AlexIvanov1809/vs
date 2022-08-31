import React from "react";
import { Route, Routes } from "react-router-dom";
import MarketPlace from "./layouts/marketPlace";
import Main from "./layouts/main";
import Login from "./layouts/login";
import NavBar from "./components/common/navBar";

function App() {
  //
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" exact element={<Main />} />
        <Route path="/market" exact element={<MarketPlace />} />
        <Route path="/market/:itemId?" exact element={<MarketPlace />} />
        {/* <Route path="/login" exact element={<Login />} /> */}
        <Route path="/:type" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
