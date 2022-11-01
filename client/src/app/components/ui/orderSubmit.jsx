import React, { useState } from "react";
import TextForm from "../common/form/textForm";
import PropTypes from "prop-types";
import { validator } from "../../utils/validator";

const OrderSubmit = ({ onSubmit }) => {
  const defaultData = {
    name: "",
    phone: "",
    address: ""
  };
  const [data, setData] = useState(defaultData);
  const [errors, setErrors] = useState({});

  const clear = () => {
    setData(defaultData);
  };
  const validatorConfig = {
    name: {
      isRequired: { message: "Поле необходимое для заполнения" }
    },
    phone: {
      isRequired: { message: "Поле необходимое для заполнения" }
    },
    address: {
      isRequired: { message: "Поле необходимое для заполнения" }
    }
  };

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
  };

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validate();
    if (errors.length === 0) {
      onSubmit(data);
      clear();
    }
  };

  return (
    <div className="card p-3">
      <form onSubmit={handleSubmit}>
        <TextForm
          label="Имя"
          name="name"
          type="text"
          value={data.name}
          onChange={handleChange}
          error={errors.name}
        />
        <TextForm
          label="Телефон"
          name="phone"
          type="tel"
          value={data.phone}
          onChange={handleChange}
          error={errors.phone}
        />
        <TextForm
          label="Адрес доставки"
          name="address"
          type="text"
          value={data.address}
          onChange={handleChange}
          error={errors.address}
        />
        <button className="btn btn-primary w-100 mt-5">Оформить</button>
      </form>
    </div>
  );
};

OrderSubmit.propTypes = {
  hid: PropTypes.bool,
  onSubmit: PropTypes.func
};

export default OrderSubmit;
