import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import CheckBoxField from "./form/checkBoxField";

const GroupList = ({ onFilter, items }) => {
  const [choose, setChoose] = useState({});
  const [filtredItems, setFiltredItems] = useState(true);

  useEffect(() => {
    const a = [];
    items && items.forEach((i) => a.push({ [i.value]: false }));
    a.forEach((i) =>
      setChoose((prevState) => ({
        ...prevState,
        [Object.keys(i)[0]]: Object.values(i)[0]
      }))
    );
  }, []);
  useEffect(() => {
    const b = Object.keys(choose).filter((i) => choose[i]);
    onFilter(b);
  }, [filtredItems]);

  // const filtredItem = groupItems
  //   .filter((item, index) => groupItems.indexOf(item) === index)
  //   .filter(Boolean)
  //   .sort();

  // const onChange = ({ target }) => {
  //   onSelectCountry(target.value, target.name);
  // };
  const handleChange = (target) => {
    setChoose((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));
    setFiltredItems(!filtredItems);
  };

  return (
    <div style={{ width: "130px", marginLeft: "20px" }}>
      {items &&
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
  items: PropTypes.array
};
export default GroupList;
