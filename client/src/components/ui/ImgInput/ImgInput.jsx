import React, { useEffect, useState } from "react";
import styles from "./imgInput.module.css";
import noPic from "../../../assets/noImg.jpg";
import cn from "classnames";

const ImgInput = ({ name, index, onChange, remove, error, path }) => {
  const [imgUrl, setImgUrl] = useState(noPic);
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
      <div className={className}>
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
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default ImgInput;
