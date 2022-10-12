import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import authService from "../../service/auth.service";
import localStorageSevice from "../../service/localStorage.service";
import TextForm from "../common/form/textForm";

const RegistrationForm = () => {
  const userId = localStorageSevice.getUserID();
  const [data, setData] = useState({
    name: "",
    password: ""
  });

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await authService.register(data);
    localStorageSevice.setTokens(user);
  };
  if (userId) {
    return (
      <form className="row g-3 mb-3" onSubmit={handleSubmit}>
        <TextForm
          label="Имя"
          name="name"
          type="text"
          value={data.name}
          onChange={handleChange}
        />
        <TextForm
          label="Пароль"
          name="password"
          type="password"
          value={data.password}
          onChange={handleChange}
        />
        <button className="btn btn-primary w-100 mx-auto" type="submit">
          submit
        </button>
      </form>
    );
  } else {
    return <Navigate to={"/login"} />;
  }
};

export default RegistrationForm;
