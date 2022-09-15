import { createSlice } from "@reduxjs/toolkit";
import brandService from "../service/brand.service";

const brandsSlice = createSlice({
  name: "brands",
  initialState: {
    entities: null,
    isLoading: true,
    error: null
  },
  reducers: {
    brandsRequested: (state) => {
      state.isLoading = true;
    },
    brandsReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    brandsRequestFeild: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    }
  }
});

const { reducer: brandsReducer, actions } = brandsSlice;
const { brandsRequested, brandsReceived, brandsRequestFeild } = actions;

export const loadbrandsList = () => async (dispatch) => {
  dispatch(brandsRequested());
  try {
    const { content } = await brandService.get();
    dispatch(brandsReceived(content));
  } catch (error) {
    dispatch(brandsRequestFeild(error.message));
  }
};

export const getBrandsList = () => (state) => state.brands.entities;
export const getBrandsLoadingStatus = () => (state) => state.brands.isLoading;
export const getBrandsError = () => (state) => state.brands.error;

export default brandsReducer;
