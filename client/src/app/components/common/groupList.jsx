import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import CheckBoxField from "./form/checkBoxField";

const GroupList = ({ value, name, onFilter, items, reset }) => {
  const [choose, setChoose] = useState({});
  const [filtredItems, setFiltredItems] = useState(false);
  const [load, setLoad] = useState(false);
  useEffect(() => {
    const itemValues = [];
    items && items.forEach((i) => itemValues.push({ [i.value]: false }));
    itemValues.forEach((i) =>
      setChoose((prevState) => ({
        ...prevState,
        [Object.keys(i)[0]]: Object.values(i)[0]
      }))
    );
  }, [reset]);
  useEffect(() => {
    const selected = Object.keys(choose).filter((i) => choose[i]);
    onFilter({ [name]: selected });
    setLoad(true);
  }, [filtredItems]);

  const handleChange = (target) => {
    setChoose((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));
    setFiltredItems(!filtredItems);
  };

  return (
    <div style={{ width: "130px", marginLeft: "20px" }}>
      <h6>{value}</h6>
      {load &&
        items.map((i) => (
          <CheckBoxField
            key={i._id}
            named={i.value}
            value={choose[i.value]}
            onChange={handleChange}
          >
            {i.value}
          </CheckBoxField>
        ))}
    </div>
  );
};

GroupList.propTypes = {
  onFilter: PropTypes.func,
  items: PropTypes.array,
  name: PropTypes.string,
  value: PropTypes.string,
  reset: PropTypes.bool
};
export default GroupList;
