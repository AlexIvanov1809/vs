import React from "react";
import PropTypes from "prop-types";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = ({ columns, data, type }) => {
  return (
    <table className="table">
      <TableHeader {...columns} />
      <TableBody {...{ columns, data, type }} />
    </table>
  );
};

Table.propTypes = {
  columns: PropTypes.object,
  data: PropTypes.array,
  type: PropTypes.string
};

export default Table;
