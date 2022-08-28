import React from "react";
import PropTypes from "prop-types";

const ItemImage = ({ item }) => {
  return (
    <div
      id="carouselExampleControls"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        <div
          className={"carousel-item" + (item.weight.quarter ? +" active" : "")}
        >
          <img
            src={"img/" + item.image.quarter + ".png"}
            className="d-block w-100"
            alt="Coffee 250"
          />
        </div>
        <div className={"carousel-item" + (item.weight.kg ? +" active" : "")}>
          <img
            src={"img/" + item.image.kg + ".png"}
            className="d-block w-100"
            alt="Coffee 1000"
          />
        </div>
      </div>
    </div>
  );
};

ItemImage.propTypes = {
  item: PropTypes.object.isRequired
};

export default ItemImage;
