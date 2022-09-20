import React, { useState, useEffect } from "react";
import SelectField from "../common/form/selectField";
import TextForm from "../common/form/textForm";
import PropTypes from "prop-types";

const OrderSubmit = ({ hid, onSubmit }) => {
  const defaultData = {
    name: "",
    phone: "",
    address: "",
    phonePref: "+38071"
  };
  const [hiddenItem, setHidden] = useState(hid);
  const [data, setData] = useState(defaultData);
  const phone = [
    {
      _id: 0,
      value: "+7949"
    }
  ];
  console.log(hiddenItem, hid);
  useEffect(() => {
    hid ? setHidden(true) : setHidden(false);
  }, [hid]);
  const clear = () => {
    setData(defaultData);
  };

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    data.phone = data.phonePref + data.phone;
    delete data.phonePref;
    onSubmit(data);
    clear();
    setHidden(true);
  };

  return (
    <div hidden={hiddenItem}>
      <form onSubmit={handleSubmit}>
        <TextForm
          label="Имя"
          name="name"
          type="text"
          value={data.name}
          onChange={handleChange}
          // error={errors.email}
        />
        <div className="d-flex align-items-end justify-content-evenly">
          <SelectField
            label=""
            value={data.phonePref}
            defaultOption="+38071"
            name="phonePref"
            options={phone}
            onChange={handleChange}
          />
          <TextForm
            label="Телефон"
            name="phone"
            type="tel"
            value={data.phone}
            onChange={handleChange}
            // error={errors.email}
          />
        </div>
        <TextForm
          label="Адрес доставки"
          name="address"
          type="text"
          value={data.address}
          onChange={handleChange}
          // error={errors.email}
        />
        <button className="btn btn-primary">Оформить</button>
      </form>
    </div>
  );
};

OrderSubmit.propTypes = {
  hid: PropTypes.bool,
  onSubmit: PropTypes.func
};

export default OrderSubmit;
