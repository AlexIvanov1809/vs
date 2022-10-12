import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getBrandsList } from "../../../store/coffeeItems/brands";
import { getCountriesList } from "../../../store/coffeeItems/countries";
import { getMethodsList } from "../../../store/coffeeItems/methods";
import { getKindsList } from "../../../store/coffeeItems/kinds";
import SelectField from "../../common/form/selectField";
import TextForm from "../../common/form/textForm";
import { createNewCoffeeItem } from "../../../store/coffeeItems/coffeeItems";
import CheckBoxField from "../../common/form/checkBoxField";
import TextAreaField from "../../common/form/textAreaField";
import { validator } from "../../../utils/validator";
import ImageLoaderField from "../../common/form/imageLoaderField";
import imageLoader from "../../../utils/imageLoader";

const CreateCoffeeItem = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [image, setImage] = useState();
  const [data, setData] = useState({
    images: {
      quarter: {},
      kg: {},
      drip: {}
    },
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
  const [errors, setErrors] = useState({});
  const validatorConfig = {
    brand: {
      isRequired: { message: "Поле необходимое для заполнения" }
    },
    method: {
      isRequired: { message: "Поле необходимое для заполнения" }
    },
    sortName: {
      isRequired: { message: "Поле необходимое для заполнения" }
    },
    description: {
      isRequired: { message: "Поле необходимое для заполнения" }
    },
    preparationMethod: {
      isRequired: { message: "Поле необходимое для заполнения" }
    },
    kind: {
      isRequired: { message: "Поле необходимое для заполнения" }
    },
    price: {
      isRequired: { message: "Поле необходимое для заполнения" }
    }
  };

  useEffect(() => {
    validate();
  }, [data]);

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
  };

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

  const handleGetImage = (file, type) => {
    setImage((prevState) => ({ ...prevState, [type]: file }));
  };

  const clearForm = () => {
    setData({
      images: { quarter: {}, kg: {}, drip: {} },
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
    clearForm();
  };

  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const uploadedImages = await imageLoader(image);
    data.images = uploadedImages;
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
    console.log(data);

    dispatch(createNewCoffeeItem(data, back));
  };
  if (!brands) {
    return <Navigate to={"/adminPanel/coffee"} />;
  } else {
    return (
      <>
        <div className="container mt-5 position-relative">
          <div className="row">
            <div className="col-md-9 offset-md-3 shadow p-4">
              <label className="fw-700 fs-3 mb-2">Создать новую карточку</label>
              <form onSubmit={handleSubmit}>
                <div className="d-flex">
                  <ImageLoaderField
                    mainImagePath="img/noFoto/noImg.jpg"
                    type="quarter"
                    onChange={handleGetImage}
                  />
                  <ImageLoaderField
                    mainImagePath="img/noFoto/noImg.jpg"
                    type="kg"
                    onChange={handleGetImage}
                  />
                  <ImageLoaderField
                    mainImagePath="img/noFoto/noImg.jpg"
                    type="drip"
                    onChange={handleGetImage}
                  />
                </div>
                <SelectField
                  label="Выберите Бренд"
                  value={data.brand}
                  defaultOption=""
                  name="brand"
                  options={brands}
                  onChange={handleChange}
                  error={errors.brand}
                />
                <SelectField
                  label="Выберите метод обработки"
                  value={data.method}
                  defaultOption=""
                  name="method"
                  options={methods}
                  onChange={handleChange}
                  error={errors.method}
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
                  error={errors.sortName}
                />
                <TextForm
                  label="Введите метод приготовления"
                  name="preparationMethod"
                  type="text"
                  value={data.preparationMethod || ""}
                  onChange={handleChange}
                  error={errors.preparationMethod}
                />
                <SelectField
                  label="Выберите сорт"
                  value={data.kind}
                  defaultOption=""
                  name="kind"
                  options={kinds}
                  onChange={handleChange}
                  error={errors.kind}
                />
                <TextAreaField
                  label="Введите описание"
                  name="description"
                  value={data.description || ""}
                  onChange={handleChange}
                  error={errors.description}
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

                <button
                  disabled={!isValid}
                  className="btn btn-primary ms-2 mb-2 h-25"
                >
                  Создать
                </button>
              </form>
              <button onClick={() => navigate(-1)}>Back</button>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default CreateCoffeeItem;
