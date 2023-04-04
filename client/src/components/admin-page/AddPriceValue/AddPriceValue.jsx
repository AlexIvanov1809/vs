import React from "react";
import { SelectField, TextInput, Button } from "../../ui/";
import { WEIGHT } from "../../../utils/consts";

const AddPriceValue = ({ price, className, onChange, removePrice }) => {
  return (
    <div key={price.id} className={className}>
      <SelectField
        _id={price.id}
        value={price.weight}
        name="weight"
        label="Вес"
        options={WEIGHT}
        onChange={onChange}
      />
      <TextInput
        _id={price.id}
        name="value"
        value={price.value}
        onChange={onChange}
        placeholder="Цена"
      />
      <Button appearance="primary" onClick={(e) => removePrice(e, price.id)}>
        Удалить
      </Button>
    </div>
  );
};

export default AddPriceValue;
