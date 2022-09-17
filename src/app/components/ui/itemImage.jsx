import React from "react";
import PropTypes from "prop-types";

const ItemImage = ({ item }) => {
  return (
    <>
      <div
        id="carouselExampleControls"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div
            className={"carousel-item" + (item === "quarter" ? +" active" : "")}
          >
            <img
              src={"img/quarter.png"}
              className="d-block w-100"
              alt="Coffee 250"
            />
          </div>
          <div className={"carousel-item" + (item === "kg" ? +" active" : "")}>
            <img
              src={"img/kg.png"}
              className="d-block w-100"
              alt="Coffee 1000"
            />
          </div>
          <div
            className={"carousel-item" + (item === "drip" ? +" active" : "")}
          >
            <img
              src={"img/drip.png"}
              className="d-block w-100"
              alt="Coffee drip"
            />
          </div>
        </div>
      </div>
    </>
  );
};

ItemImage.propTypes = {
  item: PropTypes.string
};

export default ItemImage;
