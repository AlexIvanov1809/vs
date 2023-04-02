import React, { useEffect, useState } from "react";
import styles from "./imgInput.module.css";
import noPic from "../../../assets/noImg.jpg";

const ImgInput = ({ name, index, onChange, remove, error, path }) => {
  const [imgUrl, setImgUrl] = useState(noPic);
  const reader = new FileReader();
  reader.onloadend = () => {
    setImgUrl(reader.result);
  };

  useEffect(() => {
    if (path) {
      setImgUrl(process.env.REACT_APP_API_URL + path);
    }
  }, [path]);

  const handleChange = ({ target }) => {
    if (!target.files[0]) {
      return;
    }
    const file = target.files[0];

    onChange(index, file);
    reader.readAsDataURL(file);
  };
  const handleRemoveImage = () => {
    setImgUrl(noPic);
    onChange(index, "");
  };

  return (
    <div className={styles.img_container}>
      <div className={styles} style={{ maxWidth: "200px", maxHeight: "200px" }}>
        <label htmlFor={name}>
          <img width={120} src={imgUrl} alt="No one" className="img-fluid" />
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
      {error && (
        <p className="text-danger">
          Поле необходимое для заполнения вместе с ценой
        </p>
      )}
    </div>
  );
};

export default ImgInput;
