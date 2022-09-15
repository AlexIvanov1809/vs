import { createSlice } from "@reduxjs/toolkit";
import kindService from "../service/kind.service";

const kindsSlice = createSlice({
  name: "kinds",
  initialState: {
    entities: null,
    isLoading: true,
    error: null
  },
  reducers: {
    kindsRequested: (state) => {
      state.isLoading = true;
    },
    kindsReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    kindsRequestFeild: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    }
  }
});

const { reducer: kindsReducer, actions } = kindsSlice;
const { kindsRequested, kindsReceived, kindsRequestFeild } = actions;

export const loadkindsList = () => async (dispatch) => {
  dispatch(kindsRequested());
  try {
    const { content } = await kindService.get();
    dispatch(kindsReceived(content));
  } catch (error) {
    dispatch(kindsRequestFeild(error.message));
  }
};

export const getKindsList = () => (state) => state.kinds.entities;
export const getKindsLoadingStatus = () => (state) => state.kinds.isLoading;
export const getKindsError = () => (state) => state.kinds.error;

export default kindsReducer;
