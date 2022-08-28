import React from "react";
import PropTypes from "prop-types";

const GroupList = ({ countries, selectedCountry, onSelectCountry }) => {
  const onChange = (e) => {
    onSelectCountry(e.target.value);
  };
  let index = 0;
  return (
    <select
      className="form-select w-75 mx-auto mt-2"
      aria-label="Default select example"
      value={selectedCountry}
      onChange={onChange}
    >
      <option value="">choose country</option>
      {countries.map((item) => (
        <option key={index++} value={item}>
          {item}
        </option>
      ))}
    </select>

    // <ul className="list-group mt-2" style={{ width: "200px" }}>
    //   {countries.map((item) => (
    //     <li
    //       key={index++}
    //       className={
    //         "text-center w-75 list-group-item mx-auto" +
    //         (item === selectedCountry ? " active" : "")
    //       }
    //       onClick={() => onSelectCountry(item)}
    //       role="button"
    //     >
    //       {item}
    //     </li>
    //   ))}
    // </ul>
  );
};

GroupList.propTypes = {
  countries: PropTypes.array.isRequired
};
export default GroupList;
