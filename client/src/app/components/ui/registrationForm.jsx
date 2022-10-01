import React from "react";
import CheckBoxField from "../common/form/checkBoxField";
import TextForm from "../common/form/textForm";

const RegistrationForm = () => {
  return (
    <form className="row g-3 mb-3">
      <TextForm
        label="Имя"
        name="name"
        type="text"
        // value={data.email}
        // onChange={handleChange}
        // error={errors.email}
      />
      <TextForm
        label="Элекстронная почта"
        name="email"
        type="text"
        // value={data.email}
        // onChange={handleChange}
        // error={errors.email}
      />
      <TextForm
        label="Телефон"
        name="phone"
        type="tel"
        // value={data.email}
        // onChange={handleChange}
        // error={errors.email}
      />
      <TextForm
        label="Пароль"
        name="password"
        type="password"
        // value={data.password}
        // onChange={handleChange}
        // error={errors.password}
      />
      <TextForm
        label="Подтверждение пароля"
        name="password1"
        type="password"
        // value={data.password}
        // onChange={handleChange}
        // error={errors.password}
      />
      <CheckBoxField label="Согласие на обработку персональных данных" />
      <button className="btn btn-primary w-100 mx-auto" type="submit">
        submit
      </button>
    </form>
  );
};

export default RegistrationForm;
