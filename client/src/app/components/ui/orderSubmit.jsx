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
  // const [hiddenItem, setHidden] = useState(hid);
  const [data, setData] = useState(defaultData);
  const [errors, setErrors] = useState({});

  // useEffect(() => {
  //   hid ? setHidden(true) : setHidden(false);
  // }, [hid]);
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
  // useEffect(() => {
  //   validate();
  // }, [data]);

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };
  // const isValid = Object.keys(errors).length === 0;
  const handleSubmit = (e) => {
    e.preventDefault();
    validate();
    if (!errors) {
      onSubmit(data);
      clear();
    }
    // setHidden(true);
  };

  return (
    <div className="m-2">
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
        <button
          // disabled={!isValid}
          className="btn btn-primary w-100"
        >
          Оформить
        </button>
      </form>
    </div>
  );
};

OrderSubmit.propTypes = {
  hid: PropTypes.bool,
  onSubmit: PropTypes.func
};

export default OrderSubmit;
