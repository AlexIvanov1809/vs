import React, { useState, useEffect } from "react";
import TextForm from "../common/form/textForm";
import { validator } from "../../utils/validator";
import CheckBoxField from "../common/form/checkBoxField";

const LoginForm = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };
  const validatorConfig = {
    email: {
      isRequired: { message: "Необходимо укахать ваш e-mail" },
      isEmail: { message: "Не корpектный e-mail" }
    },
    password: {
      isRequired: { message: "Поле необходимое для заполнения" },
      isCapitalSymbol: {
        message: "Пароль должен иметь хотя бы одну заглавную букву"
      },
      isContainDigit: { message: "Пароль должен иметь хотя бы одно число" },
      min: { message: "Пароль должен содержать минимум 8 символов", value: 8 }
    }
  };

  useEffect(() => {
    validate();
  }, [data]);

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    // return Object.keys(errors).length === 0;
  };

  return (
    <form className="row g-3 mb-3">
      <TextForm
        label="Элекстронная почта"
        name="email"
        type="text"
        value={data.email}
        onChange={handleChange}
        error={errors.email}
      />
      <TextForm
        label="Пароль"
        name="password"
        type="password"
        value={data.password}
        onChange={handleChange}
        error={errors.password}
      />
      <CheckBoxField label="Оставаться в сети" />
      <button className="btn btn-primary w-100 mx-auto" type="submit">
        submit
      </button>
    </form>
  );
};

export default LoginForm;
