import React, { useState } from "react";
import TextForm from "../common/form/textForm";

const LoginForm = () => {
  const [data, setData] = useState({ email: "", password: "" });

  // const validatorConfig = {
  //   email: {
  //     isRequared: { message: "Необходимо укахать ваш e-mail" }
  //   },
  //   password: { isRequared: { message: "Необходимо укахать ваш e-mail" } }
  // };

  const handleChange = ({ target }) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };
  console.log(data);
  return (
    <form className="row g-3">
      <TextForm
        label="Элекстронная почта"
        name="email"
        type="text"
        onChange={handleChange}
      />
      <TextForm
        label="Пароль"
        name="password"
        type="password"
        onChange={handleChange}
      />
      <button className="btn btn-primary w-100 mx-auto" type="submit">
        submit
      </button>
    </form>
  );
};

export default LoginForm;
