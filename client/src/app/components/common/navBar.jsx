import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getStore, loadBasketList } from "../../store/consumerBasket";
import localStorageSevice from "../../service/localStorage.service";

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = localStorageSevice.getUserID();
  const [auth, setAuth] = useState();

  useEffect(() => {
    setAuth(userId);
  }, [userId]);

  useEffect(() => {
    dispatch(loadBasketList());
  }, []);

  const basket = useSelector(getStore());

  const handleLogOut = () => {
    localStorageSevice.removeAuthData();
    setAuth("");
    navigate("/");
  };
  return (
    <div className="position-relative">
      <nav className="navbar navbar-dark bg-primary">
        <div className="logo">
          <Link className="h-100" aria-current="page" to="/">
            <img className="h-100" src="/img/logo.png" alt="Logo" />
          </Link>
        </div>
        <ul className="nav mt-2">
          <li className="nav-item">
            <Link
              className="nav-link link-light"
              aria-current="page"
              to="/market/coffee"
            >
              Магазин
            </Link>
          </li>
          {auth && (
            <>
              <li className="nav-item">
                <Link
                  className="nav-link link-light"
                  aria-current="page"
                  to="/adminPanel/coffee"
                >
                  Панель администратора
                </Link>
              </li>
              <li className="nav-item">
                <button className="btn btn-danger" onClick={handleLogOut}>
                  Выход
                </button>
              </li>
            </>
          )}
          <li className="nav-item">
            <Link
              to="/basket"
              className="btn btn-primary position-relative me-3"
            >
              <i className="bi bi-cart3 fs-4"></i>
              {basket.length > 0 ? (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {basket.length}
                  <span className="visually-hidden">items in basket</span>
                </span>
              ) : (
                ""
              )}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
