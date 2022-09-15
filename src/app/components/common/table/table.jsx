import React from "react";
import PropTypes from "prop-types";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = ({ columns, data }) => {
  return (
    <table className="table">
      <TableHeader {...columns} />
      <TableBody {...{ columns, data }} />
    </table>
  );
};

Table.propTypes = {
  columns: PropTypes.object,
  data: PropTypes.array
};

export default Table;
