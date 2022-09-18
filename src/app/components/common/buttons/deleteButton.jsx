import React from "react";
import PropTypes from "prop-types";

const DeleteButton = ({ onDelete, id, name }) => {
  return (
    <>
      <button
        className="btn btn-danger ms-2"
        onClick={() => onDelete(id, name)}
      >
        <i className="bi bi-trash"></i>
      </button>
    </>
  );
};

DeleteButton.propTypes = {
  id: PropTypes.string,
  onDelete: PropTypes.func,
  name: PropTypes.string
};

export default DeleteButton;
