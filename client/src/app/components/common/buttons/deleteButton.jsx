import React from "react";
import PropTypes from "prop-types";

const DeleteButton = ({ onDelete, item, name }) => {
  return (
    <>
      <button
        className="btn btn-white text-danger ms-2"
        onClick={() => onDelete(item, name)}
      >
        <i className="bi bi-trash"></i>
      </button>
    </>
  );
};

DeleteButton.propTypes = {
  item: PropTypes.object,
  onDelete: PropTypes.func,
  name: PropTypes.string
};

export default DeleteButton;
