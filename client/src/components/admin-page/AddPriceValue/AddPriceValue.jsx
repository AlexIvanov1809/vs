import React from "react";
import { SelectField, TextInput, Button } from "../../ui/";
import { WEIGHT } from "../../../utils/consts";
import cn from "classnames";

// removePrice -> onRemovePrice
const AddPriceValue = ({ price, className, onChange, removePrice, error }) => {
  const priceClassName = cn(className, { error });
  return (
    <>
      {/* зачем key? */}
      <div key={price.id} className={priceClassName}>
        <SelectField
          _id={price.id}
          value={price.weight}
          name="weight"
          label="Вес"
          options={WEIGHT}
          onChange={onChange}
        />
        <TextInput
          // _id - выглядит, как костыль. Либо передавай в aria аттрибутах и потом доставай через target,
          // либо переопредели onChange
          // onChange={(...args) => onChange(...args, price._id)}
          _id={price.id}
          name="value"
          value={price.value}
          onChange={onChange}
          label="Цена"
        />
        <Button appearance="primary" onClick={(e) => removePrice(e, price.id)}>
          Удалить
        </Button>
      </div>
      {error && <span className="error">{error}</span>}
    </>
  );
};

export default AddPriceValue;
