import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { useDispatch } from "react-redux";
import { coffeeItemRemove } from "../../../store/coffeeItems";
import { Link } from "react-router-dom";
import DeleteButton from "../buttons/deleteButton";

const TableBody = ({ data, columns }) => {
  const dispatch = useDispatch();
  const handleDelete = (itemId) => {
    dispatch(coffeeItemRemove(itemId));
  };
  const renderContent = (item, column) => {
    if (columns[column].component) {
      const component = columns[column].component;
      if (typeof component === "function") {
        return component(item);
      }
      return component;
    }
    return _.get(item, columns[column].path);
  };
  return (
    <tbody>
      {data ? (
        data.map((item) => (
          <tr key={item._id}>
            {Object.keys(columns).map((column) => (
              <td key={column}>{renderContent(item, column)}</td>
            ))}
            <td>
              <DeleteButton onDelete={handleDelete} id={item._id} />
              <button className="btn btn-primary ms-2">
                <Link className="text-white" to={`/adminPanel/${item._id}`}>
                  <i className="bi bi-pencil-fill"></i>
                </Link>
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td>нет данных</td>
        </tr>
      )}
    </tbody>
  );
};

TableBody.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.object.isRequired
};

export default TableBody;
