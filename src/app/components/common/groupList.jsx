import React from "react";
import PropTypes from "prop-types";

const GroupList = ({ countries, selectedCountry, onSelectCountry }) => {
  let index = 0;
  return (
    <aside>
      <ul className="list-group">
        {countries.map((item) => (
          <li
            key={index++}
            className={
              "list-group-item" + (item === selectedCountry ? " active" : "")
            }
            onClick={() => onSelectCountry(item)}
            role="button"
          >
            {item}
          </li>
        ))}
      </ul>
    </aside>
  );
};

GroupList.propTypes = {
  countries: PropTypes.array.isRequired
};
export default GroupList;
