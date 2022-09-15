import { createSlice } from "@reduxjs/toolkit";
import countryService from "../service/country.service";

const countriesSlice = createSlice({
  name: "countries",
  initialState: {
    entities: null,
    isLoading: true,
    error: null
  },
  reducers: {
    countriesRequested: (state) => {
      state.isLoading = true;
    },
    countriesReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    countriesRequestFeild: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    }
  }
});

const { reducer: countriesReducer, actions } = countriesSlice;
const { countriesRequested, countriesReceived, countriesRequestFeild } =
  actions;

export const loadCountriesList = () => async (dispatch) => {
  dispatch(countriesRequested());
  try {
    const { content } = await countryService.get();
    dispatch(countriesReceived(content));
  } catch (error) {
    dispatch(countriesRequestFeild(error.message));
  }
};

export const getCountriesList = () => (state) => state.countries.entities;
export const getCountriesLoadingStatus = () => (state) =>
  state.countries.isLoading;
export const getCountriesError = () => (state) => state.countries.error;

export default countriesReducer;
