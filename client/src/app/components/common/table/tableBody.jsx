import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
// import { useDispatch } from "react-redux";
// import { coffeeItemRemove } from "../../../store/coffeeItems/coffeeItems";
import { Link } from "react-router-dom";
// import DeleteButton from "../buttons/deleteButton";
// import { teaItemRemove } from "../../../store/teaItems/teaItems";

const TableBody = ({ data, columns, type }) => {
  // const dispatch = useDispatch();
  // const handleDelete = (itemId) => {
  //   if (type === "coffee") {
  //     dispatch(coffeeItemRemove(itemId));
  //   }
  //   if (type === "tea") {
  //     dispatch(teaItemRemove(itemId));
  //   }
  // };
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
              {/* <DeleteButton onDelete={handleDelete} itemId={item._id} /> */}
              <Link
                className="btn btn-primary"
                to={`/adminPanel/${type}/${item._id}`}
              >
                Открыть
              </Link>
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
  type: PropTypes.string,
  columns: PropTypes.object.isRequired
};

export default TableBody;
