import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import "bootstrap-icons/font/bootstrap-icons.css";

const ItemImage = ({ image }) => {
  const img = useRef(null);
  useEffect(() => {
    console.log(img.current.clientHeight);
  }, [img.current]);
  console.log(img.current);
  return (
    <div className="d-flex align-items-center">
      <i className="bi bi-caret-left-fill" type="button"></i>
      <div className="image-container">
        <img
          ref={img}
          style={{
            transform: `translateX(10px)`
          }}
          className="image-coffee w-100 h-100"
          src={"img/" + image.quarter + ".png"}
          alt="coffee box"
        />
        <img
          style={{
            transform: `translateX(10px)`
          }}
          className="image-coffee w-100 h-100"
          src={"img/" + image.kg + ".png"}
          alt="coffee box"
        />
      </div>
      <i className="bi bi-caret-right-fill" type="button"></i>
    </div>
  );
};

ItemImage.propTypes = {
  image: PropTypes.object.isRequired
};

export default ItemImage;
