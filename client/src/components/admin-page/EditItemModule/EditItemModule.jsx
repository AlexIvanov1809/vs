import React, { useContext, useEffect, useState } from "react";
import styles from "./EditItemModule.module.css";
import SelectField from "../../ui/SelectField/SelectField";
import { Context } from "../../..";
import Button from "../../ui/Button/Button";
import TextAreaField from "../../ui/TextAriaField/TextAreaField";
import CheckBox from "../../ui/CheckBox/CheckBox";
import httpService from "../../../http/productAPI";
import TextInput from "../../ui/TextInput/TextInput";
import ImgInput from "../../ui/ImgInput/ImgInput";
import makeFormDataFile from "../../../utils/makeFormDataFile";
import { level, DEFAULT, WEIGHT } from "../../../utils/consts";
import imgUploader from "../../../utils/imgUploader";
import removedPriceIds from "../../../utils/removerPriceIds";

const EditItemModule = ({ item, onHide, updated }) => {
  const { products } = useContext(Context);
  const [data, setData] = useState(item || DEFAULT);
  const [img, setImg] = useState(["", "", ""]);
  const [price, setPrice] = useState(
    item?.price || [{ id: Date.now(), weight: "", value: "" }],
  );
  const [removedPrice, setRemovedPrice] = useState(false);

  useEffect(() => {
    if (item) {
      item.image.forEach((image, index) => {
        setImg((img) => img.map((i, ind) => (ind === index ? image.name : i)));
      });
    }
  }, [item]);

  const changeHandle = ({ name, value }) => {
    setData((prevState) => ({ ...prevState, [name]: value }));
  };

  const changePrice = ({ name, value }, id) => {
    setPrice(price.map((p) => (p.id === id ? { ...p, [name]: value } : p)));
  };

  const changeImgHandle = (index, file) => {
    setImg((img) => img.map((i, ind) => (ind === index ? file : i)));
  };

  const addPrice = (e) => {
    e.preventDefault();
    setPrice([...price, { id: Date.now(), weight: "", value: "" }]);
  };

  const removePrice = (e, id) => {
    e.preventDefault();
    setPrice(price.filter((p) => p.id !== id));
    setRemovedPrice(true);
  };

  const submitHandle = (e) => {
    e.preventDefault();
    if (item) {
      if (removedPrice) {
        const removedPriceId = removedPriceIds(price, item.price);
        removedPriceId.forEach((i) =>
          httpService
            .removePriceProduct(i)
            .then((data) => console.log(data))
            .catch((e) => console.log(e)),
        );
      }
      imgUploader(img, item);
      httpService
        .editProduct({ ...data, price: JSON.stringify(price) })
        .then((data) => {
          onHide(false);
          updated(true);
        })
        .catch((e) => console.log(e));
    } else {
      const formData = makeFormDataFile(
        { ...data, price: JSON.stringify(price) },
        img,
      );
      httpService
        .createProduct(formData)
        .then((data) => {
          onHide(false);
          updated(true);
        })
        .catch((e) => console.log(e.message));
    }
  };
  return (
    <div className={styles.edit_module}>
      <div className={styles.edit_container}>
        <h3>{item ? "Редактировать" : "Создать"}</h3>
        <form onSubmit={submitHandle}>
          <div className={styles.edit_items}>
            <div className={styles.edit_img}>
              {img.length > 0 &&
                img.map((item, index) => (
                  <ImgInput
                    key={index}
                    name={"img" + index}
                    index={index}
                    onChange={changeImgHandle}
                    remove={true}
                    path={item}
                  />
                ))}
            </div>
            <SelectField
              value={data.typeId}
              name="typeId"
              label="Вид товара"
              options={products.types}
              onChange={changeHandle}
            />
            <SelectField
              value={data.brandId}
              name="brandId"
              label="Бренд"
              options={products.brands}
              onChange={changeHandle}
            />
            <SelectField
              value={data.countryId}
              name="countryId"
              label="Страна"
              options={products.countries}
              onChange={changeHandle}
            />
            <TextInput
              label="Сорт или название"
              name="sortName"
              value={data.sortName}
              onChange={changeHandle}
            />
            <SelectField
              value={data.manufacturingMethodId}
              name="manufacturingMethodId"
              label="Метод производства"
              options={products.manufacturingMethods}
              onChange={changeHandle}
            />
            <SelectField
              value={data.packageTypeId}
              name="packageTypeId"
              label="Вид упаковки"
              options={products.packageTypes}
              onChange={changeHandle}
            />
            <SelectField
              value={data.teaTypeId}
              name="teaTypeId"
              label="Тип чая"
              options={products.teaTypes}
              onChange={changeHandle}
            />
            <SelectField
              value={data.makingMethodId}
              name="makingMethodId"
              label="Метод приготовления"
              options={products.makingMethods}
              onChange={changeHandle}
            />
            <SelectField
              value={data.acidity}
              name="acidity"
              label="Кислотность"
              options={level}
              onChange={changeHandle}
            />
            <SelectField
              value={data.density}
              name="density"
              label="Плотность"
              options={level}
              onChange={changeHandle}
            />
            <div>
              <TextAreaField
                label="Короткое описание"
                name="shortDescription"
                value={data.shortDescription}
                onChange={changeHandle}
              />
              <TextAreaField
                label="Полное описание"
                name="description"
                value={data.description}
                onChange={changeHandle}
              />
            </div>
            <CheckBox name="active" value={data.active} onChange={changeHandle}>
              Активность
            </CheckBox>
            <div>
              <Button
                appearance="primary"
                onClick={addPrice}
                disabled={price.length > 2}
              >
                Добавить цену
              </Button>
              {price.map((p) => (
                <div key={p.id} className={styles.edit_price}>
                  <SelectField
                    _id={p.id}
                    value={p.weight}
                    name="weight"
                    label="Вес"
                    options={WEIGHT}
                    onChange={changePrice}
                  />
                  <TextInput
                    _id={p.id}
                    name="value"
                    value={p.value}
                    onChange={changePrice}
                    placeholder="Цена"
                  />
                  <Button
                    appearance="primary"
                    onClick={(e) => removePrice(e, p.id)}
                  >
                    Удалить
                  </Button>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.btn}>
            <Button onClick={onHide} appearance="danger">
              Закрыть
            </Button>
            <Button appearance="primary" type="submit">
              {item ? "Редактировать" : "Создать"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditItemModule;
