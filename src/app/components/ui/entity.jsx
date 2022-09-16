import React, { useState } from "react";
import PropTypes from "prop-types";
import TextForm from "../common/form/textForm";

const Entity = ({ items, onDelete, onSubmit, label, name }) => {
  const [data, setData] = useState({});
  // const ItemName = name;

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));
  };

  const clearForm = () => {
    setData({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(data);
    clearForm();
  };

  return (
    <>
      <div className="mx-2">
        <form className="d-flex align-items-end" onSubmit={handleSubmit}>
          <TextForm
            label={label}
            name={name}
            type="text"
            value={data[name] || ""}
            onChange={handleChange}
          />
          <button className="btn btn-primary ms-2 mb-2 h-25">Создать</button>
        </form>
        {items
          ? items.map((item) => (
              <div key={item._id}>
                {item.value}
                <button
                  className="btn btn-primary ms-2"
                  onClick={() => onDelete(item._id, name)}
                >
                  <i className="bi bi-trash"></i>
                </button>
              </div>
            ))
          : "Нет данных"}
      </div>
    </>
  );
};

Entity.propTypes = {
  items: PropTypes.array,
  name: PropTypes.string,
  label: PropTypes.string,
  onSubmit: PropTypes.func,
  onDelete: PropTypes.func
};

export default Entity;
