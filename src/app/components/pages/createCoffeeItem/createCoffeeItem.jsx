import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getBrandsList } from "../../../store/brands";
import { getCountriesList } from "../../../store/countries";
import { getMethodsList } from "../../../store/methods";
import { getKindsList } from "../../../store/kinds";
import SelectField from "../../common/form/selectField";
import TextForm from "../../common/form/textForm";
import { nanoid } from "@reduxjs/toolkit";
import { createNewCoffeeItem } from "../../../store/coffeeItems";
import CheckBoxField from "../../common/form/checkBoxField";

const CreateCoffeeItem = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState({
    _id: null,
    acidity: 0,
    brand: "",
    country: "",
    density: 0,
    description: "",
    sortName: "",
    kind: "",
    method: "",
    preparationMethod: "",
    priceQuarter: "",
    priceKg: "",
    priceDrip: "",
    active: true
  });

  // const [errors, setErrors] = useState({});

  const brands = useSelector(getBrandsList());
  const countries = useSelector(getCountriesList());
  const methods = useSelector(getMethodsList());
  const kinds = useSelector(getKindsList());
  const level = [
    { _id: 1, value: 1 },
    { _id: 2, value: 2 },
    { _id: 3, value: 3 },
    { _id: 4, value: 4 },
    { _id: 5, value: 5 },
    { _id: 6, value: 6 },
    { _id: 7, value: 7 },
    { _id: 8, value: 8 },
    { _id: 9, value: 9 },
    { _id: 10, value: 10 }
  ];

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const clearForm = () => {
    setData({
      _id: null,
      acidity: 0,
      brand: "",
      country: "",
      density: 0,
      description: "",
      sortName: "",
      kind: "",
      method: "",
      preparationMethod: "",
      priceQuarter: "",
      priceKg: "",
      priceDrip: "",
      active: true
    });
  };

  const back = () => {
    navigate(-1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    data._id = nanoid();
    data.price = {
      quarter: data.priceQuarter,
      kg: data.priceKg,
      drip: data.priceDrip
    };
    data.name = data.country
      ? data.country + " " + data.sortName
      : data.sortName;
    delete data.priceDrip;
    delete data.priceKg;
    delete data.priceQuarter;
    dispatch(createNewCoffeeItem(data, back));
    clearForm();
  };
  return (
    <>
      <div className="container mt-5 position-relative">
        <div className="row">
          <div className="col-md-9 offset-md-3 shadow p-4">
            <label className="fw-700 fs-3 mb-2">Создать новую карточку</label>
            <form onSubmit={handleSubmit}>
              <SelectField
                label="Выберите Бренд"
                value={data.brand}
                defaultOption=""
                name="brand"
                options={brands}
                onChange={handleChange}
              />
              <SelectField
                label="Выберите метод обработки"
                value={data.method}
                defaultOption=""
                name="method"
                options={methods}
                onChange={handleChange}
              />
              <SelectField
                label="Выберите Страну"
                value={data.country}
                defaultOption=""
                name="country"
                options={countries}
                onChange={handleChange}
              />
              <TextForm
                label="Введите название сорта или смеси"
                name="sortName"
                type="text"
                value={data.sortName || ""}
                onChange={handleChange}
              />
              <TextForm
                label="Введите метод приготовления"
                name="preparationMethod"
                type="text"
                value={data.preparationMethod || ""}
                onChange={handleChange}
              />
              <SelectField
                label="Выберите сорт"
                value={data.kind}
                defaultOption=""
                name="kind"
                options={kinds}
                onChange={handleChange}
              />
              <TextForm
                label="Введите описание"
                name="description"
                type="text"
                value={data.description || ""}
                onChange={handleChange}
              />
              <div className="d-flex justify-content-between">
                <SelectField
                  label="Выберите уровень кислотности"
                  value={data.acidity}
                  defaultOption={"0"}
                  name="acidity"
                  options={level}
                  onChange={handleChange}
                />
                <SelectField
                  label="Выберите уровень плотности"
                  value={data.density}
                  defaultOption={"0"}
                  name="density"
                  options={level}
                  onChange={handleChange}
                />
              </div>
              <div className="d-flex justify-content-between text-center">
                <TextForm
                  className="w-25"
                  label="250"
                  name="priceQuarter"
                  type="text"
                  value={data.priceQuarter || ""}
                  onChange={handleChange}
                />
                <TextForm
                  className="w-25"
                  label="1000"
                  name="priceKg"
                  type="text"
                  value={data.priceKg || ""}
                  onChange={handleChange}
                />
                <TextForm
                  className="w-25"
                  label="Дрип шт"
                  name="priceDrip"
                  type="text"
                  value={data.priceDrip || ""}
                  onChange={handleChange}
                />
              </div>
              <CheckBoxField
                named="active"
                value={data.active}
                onChange={handleChange}
              >
                Активность
              </CheckBoxField>

              <button className="btn btn-primary ms-2 mb-2 h-25">
                Создать
              </button>
            </form>
            <button onClick={() => navigate(-1)}>Back</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateCoffeeItem;
