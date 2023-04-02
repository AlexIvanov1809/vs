import React, { useState } from "react";
import styles from "./ImgCarousel.module.css";
import cn from "classnames";

const ImgCarousel = ({ images }) => {
  const [imgIndex, setImgIndex] = useState(0);

  const prev = () => {
    setImgIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };
  const next = () => {
    setImgIndex((prev) => (prev < images.length - 1 ? prev + 1 : prev));
  };
  return (
    <div className={styles.carousel}>
      <div className={styles.carousel_main}>
        <div
          className={styles.carousel_container}
          style={{ transform: `translateX(-${imgIndex * 200}px)` }}
        >
          {images &&
            images.map((i) => (
              <img
                key={i.id}
                width={200}
                src={process.env.REACT_APP_API_URL + i.name}
                alt="item"
              />
            ))}
        </div>
      </div>
      {images.length > imgIndex && imgIndex !== 0 && (
        <button
          className={cn(styles.carousel_btn, styles.btn_prev)}
          onClick={prev}
        >
          {"<"}
        </button>
      )}
      {images.length > imgIndex && imgIndex !== images.length - 1 && (
        <button
          className={cn(styles.carousel_btn, styles.btn_next)}
          onClick={next}
        >
          {">"}
        </button>
      )}
    </div>
  );
};

export default ImgCarousel;
