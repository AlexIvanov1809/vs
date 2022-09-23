import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar navbar-dark bg-primary ">
      <div className="logo">
        <Link className="logo__main" aria-current="page" to="/">
          <img
            className="logo__main"
            src="/img/Venditore logo.png"
            alt="Logo"
          />
        </Link>
      </div>
      <ul className="nav">
        <li className="nav-item">
          <Link
            className="nav-link link-light"
            aria-current="page"
            to="/market/coffee"
          >
            Market
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link link-light"
            aria-current="page"
            to="/adminPanel/coffee"
          >
            Admin Panel
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link link-light" aria-current="page" to="/login">
            Login
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
