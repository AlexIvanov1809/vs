import React from "react";
import PropTypes from "prop-types";

const GroupList = ({ groupItems, selectedCountry, onSelectCountry, name }) => {
  const filtredItems = groupItems
    .filter((item, index) => groupItems.indexOf(item) === index)
    .filter(Boolean)
    .sort();

  const onChange = ({ target }) => {
    onSelectCountry(target.value, target.name);
  };
  let index = 0;
  return (
    <select
      className="form-select w-75 mx-auto mt-2"
      aria-label="Default select example"
      value={selectedCountry}
      name={name}
      onChange={onChange}
    >
      <option value="">Choose</option>
      {filtredItems.map((item) => (
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
  groupItems: PropTypes.array.isRequired,
  selectedCountry: PropTypes.string.isRequired,
  onSelectCountry: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired
};
export default GroupList;
