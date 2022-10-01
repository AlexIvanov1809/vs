import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import LoginForm from "../components/ui/loginForm";
import RegistrationForm from "../components/ui/registrationForm";

const Login = () => {
  const { type } = useParams();
  const [formType, setFormType] = useState(
    type === "registration" ? type : "login"
  );

  const toggleChangeForm = () => {
    setFormType((prevState) =>
      prevState === "registration" ? "login" : "registration"
    );
  };
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          {formType === "login" ? (
            <>
              <h2>Войти</h2>
              <LoginForm />
              <p>
                Нет аккаунта?{" "}
                <Link to="/registration" onClick={toggleChangeForm}>
                  Регистрация
                </Link>
              </p>
            </>
          ) : (
            <>
              <h2>Регистрация</h2>
              <RegistrationForm />
              <p>
                Уже есть аккаунт?{" "}
                <Link to="/login" onClick={toggleChangeForm}>
                  Войти
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
