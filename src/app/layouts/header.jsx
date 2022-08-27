import React from "react";
import { Route, Routes } from "react-router-dom";
import MarketPlace from "./marketPlace";
import Main from "./main";
import Login from "./login";
import NavBar from "../components/common/navBar";

const Header = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" exact element={<Main />} />
        <Route path="/market" exact element={<MarketPlace />} />
        <Route path="/market/:itemId?" exact element={<MarketPlace />} />
        <Route path="/login" exact element={<Login />} />
      </Routes>
    </>
  );
};

export default Header;
