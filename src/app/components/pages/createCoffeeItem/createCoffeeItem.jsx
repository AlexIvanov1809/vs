import React from "react";
import { useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   getBrandsList,
// } from "../../../store/brands";
// import {
//   getCountriesList,
// } from "../../../store/countries";
// import {
//   getMethodsList,
// } from "../../../store/methods";
// import {
//   getKindsList,
// } from "../../../store/kinds";

const CreateCoffeeItem = () => {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const brands = useSelector(getBrandsList());
  // const countries = useSelector(getCountriesList());
  // const methods = useSelector(getMethodsList());
  // const kinds = useSelector(getKindsList());
  // const [errors, setErrors] = useState({});
  // const [data, setData] = useState({
  //   _id: null,
  //   acidity: null,
  //   brand: null,
  //   country: null,
  //   density: null,
  //   description: "",
  //   grade: "",
  //   kind: null,
  //   method: null,
  //   price: null
  // });

  // useEffect(() => {

  // }, []);

  return (
    <>
      <button onClick={() => navigate(-1)}>Back</button>
      <h2>create coffee</h2>
    </>
  );
};

export default CreateCoffeeItem;
