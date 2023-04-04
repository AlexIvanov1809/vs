import React, { useContext, useEffect, useState } from "react";
import styles from "./EditItemModule.module.css";
import {
  Button,
  TextAreaField,
  CheckBox,
  TextInput,
  ImgInput,
  SelectField,
} from "../../ui/";
import AddPriceValue from "../AddPriceValue/AddPriceValue";
import httpService from "../../../http/productAPI";
import { Context } from "../../..";
import {
  makeFormDataFile,
  imgUploader,
  removedPriceIds,
} from "../../../utils/";
import { level, DEFAULT } from "../../../utils/consts";

const EditItemModule = ({ product, onHide, updated }) => {
  const { products } = useContext(Context);
  const [data, setData] = useState(product || DEFAULT);
  const [img, setImg] = useState(["", "", ""]);
  const [price, setPrice] = useState(
    product?.price || [{ id: Date.now(), weight: "", value: "" }],
  );
  const [removedPrice, setRemovedPrice] = useState(false);

  useEffect(() => {
    if (product) {
      product.image.forEach((image) => {
        setImg((img) =>
          img.map((i, ind) => (ind === image.row ? image.name : i)),
        );
      });
    }
  }, [product]);

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
    if (product) {
      if (removedPrice) {
        const removedPriceId = removedPriceIds(price, product.price);
        removedPriceId.forEach((i) =>
          httpService
            .removePriceProduct(i)
            .then((data) => console.log(data))
            .catch((e) => console.log(e)),
        );
      }
      imgUploader(img, product);
      httpService
        .editProduct({ ...data, price: JSON.stringify(price) })
        .then((data) => {
          onHide(false);
          updated(true);
        })
        .catch((e) => console.log(e.response.data));
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
        <h3>{product ? "Редактировать" : "Создать"}</h3>
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
                <AddPriceValue
                  key={p.id}
                  price={p}
                  onChange={changePrice}
                  removePrice={removePrice}
                  className={styles.edit_price}
                />
              ))}
            </div>
          </div>
          <div className={styles.btn}>
            <Button onClick={onHide} appearance="danger">
              Закрыть
            </Button>
            <Button appearance="primary" type="submit">
              {product ? "Редактировать" : "Создать"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditItemModule;
