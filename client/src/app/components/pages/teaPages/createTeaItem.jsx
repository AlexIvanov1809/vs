import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import SelectField from "../../common/form/selectField";
import TextForm from "../../common/form/textForm";
import { validator } from "../../../utils/validator";
import CheckBoxField from "../../common/form/checkBoxField";
import { getTeaTypesList } from "../../../store/teaItems/teaType";
import { createNewTeaItem } from "../../../store/teaItems/teaItems";
import { getTeaPackagesList } from "../../../store/teaItems/teaPackages";
import { getTeaBrandsList } from "../../../store/teaItems/teaBrands";
import TextAreaField from "../../common/form/textAreaField";
import ImageLoaderField from "../../common/form/imageLoaderField";
import imageLoader from "../../../utils/imageLoader";

const CreateTeaItem = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState({
    brand: "",
    images: {},
    package: "",
    type: "",
    description: "",
    name: "",
    weight: "",
    recipe: "",
    price: "",
    active: true
  });
  const [errors, setErrors] = useState({});

  const brands = useSelector(getTeaBrandsList());
  const teaPackages = useSelector(getTeaPackagesList());
  const teaTypes = useSelector(getTeaTypesList());
  const weight = [
    { _id: 0, value: 50 },
    { _id: 1, value: 75 },
    { _id: 2, value: 100 },
    { _id: 3, value: 125 },
    { _id: 4, value: 150 },
    { _id: 5, value: "шт" }
  ];

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };
  const handleGetImage = (file, type) => {
    setData((prevState) => ({ ...prevState, images: { [type]: file } }));
  };
  const validatorConfig = {
    brand: {
      isRequired: { message: "Поле необходимое для заполнения" }
    },
    type: {
      isRequired: { message: "Поле необходимое для заполнения" }
    },
    package: {
      isRequired: { message: "Поле необходимое для заполнения" }
    },
    name: {
      isRequired: { message: "Поле необходимое для заполнения" }
    },
    description: {
      isRequired: { message: "Поле необходимое для заполнения" }
    },
    weight: {
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

  const clearForm = () => {
    setData({
      brand: "",
      images: {},
      package: "",
      type: "",
      description: "",
      name: "",
      price: "",
      recipe: "",
      weight: "",
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
    const uploadedImage = await imageLoader(data.images);
    data.images = uploadedImage;
    dispatch(createNewTeaItem(data, back));
  };
  if (!brands) {
    return <Navigate to={"/adminPanel/tea"} />;
  } else {
    return (
      <>
        <div className="container mt-5 position-relative">
          <div className="row">
            <div className="col-md-9 offset-md-3 shadow p-4">
              <label className="fw-700 fs-3 mb-2">Создать новую карточку</label>
              <form onSubmit={handleSubmit}>
                <ImageLoaderField
                  mainImagePath="img/noFoto/noImg.jpg"
                  type="tea"
                  onChange={handleGetImage}
                />
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
                  label="Выберите Вид"
                  value={data.type}
                  defaultOption=""
                  name="type"
                  options={teaTypes}
                  onChange={handleChange}
                  error={errors.type}
                />
                <SelectField
                  label="Выберите Упаковку"
                  value={data.package}
                  defaultOption=""
                  name="package"
                  options={teaPackages}
                  onChange={handleChange}
                  error={errors.package}
                />
                <TextForm
                  label="Введите Название"
                  name="name"
                  type="text"
                  value={data.name || ""}
                  onChange={handleChange}
                  error={errors.name}
                />
                <TextAreaField
                  label="Введите описание"
                  name="description"
                  value={data.description || ""}
                  onChange={handleChange}
                  error={errors.description}
                />
                <TextAreaField
                  label="Введите способ приготовления (если имеется)"
                  name="recipe"
                  value={data.recipe || ""}
                  onChange={handleChange}
                />
                <SelectField
                  label="Выберите вес или шт"
                  value={data.weight}
                  defaultOption=""
                  name="weight"
                  options={weight}
                  onChange={handleChange}
                  error={errors.weight}
                />
                <TextForm
                  className="w-25"
                  label="Цена за кг."
                  name="price"
                  type="text"
                  value={data.price || ""}
                  onChange={handleChange}
                  error={errors.price}
                />
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

export default CreateTeaItem;
