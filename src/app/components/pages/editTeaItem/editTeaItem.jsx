import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import SelectField from "../../common/form/selectField";
import TextForm from "../../common/form/textForm";
import CheckBoxField from "../../common/form/checkBoxField";
import { getTeaTypesList } from "../../../store/teaItems/teaType";
import { editTeaItem, getTeaItemById } from "../../../store/teaItems/teaItems";
import { getTeaPackagesList } from "../../../store/teaItems/teaPackages";
import { getTeaBrandsList } from "../../../store/teaItems/teaBrands";

const EditTeaItem = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { itemId } = useParams();
  const brands = useSelector(getTeaBrandsList());
  const teaPackages = useSelector(getTeaPackagesList());
  const teaTypes = useSelector(getTeaTypesList());
  const currenTeaItem = useSelector(getTeaItemById(itemId));
  const weight = [
    { _id: 0, value: 50 },
    { _id: 1, value: 75 },
    { _id: 2, value: 100 },
    { _id: 3, value: 125 },
    { _id: 4, value: 150 },
    { _id: 5, value: "шт" }
  ];
  const [data, setData] = useState();
  // const [errors, setErrors] = useState({});

  // const coffeeItems = useSelector(getCoffeeItemsList());

  useEffect(() => {
    if (currenTeaItem) {
      setData({
        ...currenTeaItem
      });
    }
  }, []);

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };
  const back = () => {
    navigate(-1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editTeaItem(data, back));
  };
  return (
    <>
      {data ? (
        <div className="container mt-5 position-relative">
          <div className="row">
            <div className="col-md-9 offset-md-3 shadow p-4">
              <label className="fw-700 fs-3 mb-2">Изменить карточку</label>
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
                  label="Выберите Вид"
                  value={data.type}
                  defaultOption=""
                  name="type"
                  options={teaTypes}
                  onChange={handleChange}
                />
                <SelectField
                  label="Выберите Упаковку"
                  value={data.package}
                  defaultOption=""
                  name="package"
                  options={teaPackages}
                  onChange={handleChange}
                />
                <TextForm
                  label="Введите Название"
                  name="name"
                  type="text"
                  value={data.name || ""}
                  onChange={handleChange}
                />
                <TextForm
                  label="Введите описание"
                  name="description"
                  type="text"
                  value={data.description || ""}
                  onChange={handleChange}
                />
                <SelectField
                  label="Выберите вес или шт"
                  value={data.weight}
                  defaultOption=""
                  name="weight"
                  options={weight}
                  onChange={handleChange}
                />
                <TextForm
                  className="w-25"
                  label="Цена за кг."
                  name="price"
                  type="text"
                  value={data.price || ""}
                  onChange={handleChange}
                />
                <CheckBoxField
                  named="active"
                  value={data.active}
                  onChange={handleChange}
                >
                  Активность
                </CheckBoxField>

                <button className="btn btn-primary ms-2 mb-2 h-25">
                  Изменить
                </button>
              </form>

              <button onClick={() => navigate(-1)}>Back</button>
            </div>
          </div>
        </div>
      ) : (
        "loading.."
      )}
    </>
  );
};

export default EditTeaItem;
