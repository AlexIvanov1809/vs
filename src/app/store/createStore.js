import { combineReducers, configureStore } from "@reduxjs/toolkit";
import brandsReducer from "./brands";
import coffeeItemsReducer from "./coffeeItems";
import consumerBusketreducer from "./consumerBasket";
import countriesReducer from "./countries";
import kindsReducer from "./kinds";
import methodsReducer from "./methods";

const rootReducer = combineReducers({
  countries: countriesReducer,
  coffeeItems: coffeeItemsReducer,
  methods: methodsReducer,
  brands: brandsReducer,
  kinds: kindsReducer,
  consumerBusket: consumerBusketreducer
});

export function createStore() {
  return configureStore({
    reducer: rootReducer
  });
}
