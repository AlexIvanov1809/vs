import React from "react";
import PropTypes from "prop-types";

const GroupList = ({ countries, selectedCountry, onSelectCountry }) => {
  return (
    <>
      <ul className="list-group">
        {Object.keys(countries).map((item) => (
          <li
            key={countries[item]._id}
            className={
              "list-group-item" +
              (countries[item] === selectedCountry ? " active" : "")
            }
            onClick={() => onSelectCountry(countries[item])}
            role="button"
          >
            {countries[item].name}
          </li>
        ))}
      </ul>
    </>
  );
};

GroupList.propTypes = {
  countries: PropTypes.object.isRequired
};
export default GroupList;
