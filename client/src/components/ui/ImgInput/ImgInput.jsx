import React, { useEffect, useState } from "react";
import styles from "./imgInput.module.css";
import noPic from "../../../assets/noImg.jpg";
import cn from "classnames";

// remove - звучит, как глагол\функция, а хранит в себе булеан
const ImgInput = ({ name, index, onChange, remove, error, path }) => {
  // по внутренним ощущениям, путь к картинке должен быть вполне себе линейно вычисляемым, это не что-то, что
  // становится известно после каких-то действий
  // const [imgUrl, setImgUrl] = useState(noPic);
  const imgSrc = path ? process.env.REACT_APP_API_URL + path : noPic;
  const reader = new FileReader();
  reader.onloadend = () => {
    setImgUrl(reader.result);
  };

  const className = cn(styles.img, { [styles.img_error]: error });

  useEffect(() => {
    if (path) {
      setImgUrl(process.env.REACT_APP_API_URL + path);
    }
  }, [path]);

  const handleChange = ({ target }) => {
    const file = target.files[0];

    if (!file) {
      return;
    }

    onChange(index, file);
    reader.readAsDataURL(file);
  };
  const handleRemoveImage = () => {
    // здесь логика должна идти из родительского компонента. То есть вызвав колбэк onChange(index, ""), path должен
    // стать пустым и тогда imgSrc (который я объявил сверху) примет значение noPic
    // setImgUrl(noPic);

    // я бы добавил отдельный проп для оповещения об удалении - onRemove
    onChange(index, "");
  };

  return (
    <div className={styles.img_container}>
      <div className={className}>
        <label htmlFor={name}>
          <img width={120} src={imgSrc} alt="No one" className="img-fluid" />
        </label>
        <input
          type="file"
          id={name}
          className="d-none"
          onChange={handleChange}
          accept="image/*,.png,.jpg,.jpeg,.webp,"
        />
        {remove && (
          <div
            className={styles.img_btn}
            role="button"
            onClick={handleRemoveImage}
          >
            X
          </div>
        )}
      </div>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default ImgInput;
