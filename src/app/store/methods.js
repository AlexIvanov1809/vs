import { createSlice } from "@reduxjs/toolkit";
import methodService from "../service/method.service";

const methodsSlice = createSlice({
  name: "methods",
  initialState: {
    entities: null,
    isLoading: true,
    error: null
  },
  reducers: {
    methodsRequested: (state) => {
      state.isLoading = true;
    },
    methodsReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    methodsRequestFeild: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    }
  }
});

const { reducer: methodsReducer, actions } = methodsSlice;
const { methodsRequested, methodsReceived, methodsRequestFeild } = actions;

export const loadmethodsList = () => async (dispatch) => {
  dispatch(methodsRequested());
  try {
    const { content } = await methodService.get();
    dispatch(methodsReceived(content));
  } catch (error) {
    dispatch(methodsRequestFeild(error.message));
  }
};

export const getMethodsList = () => (state) => state.methods.entities;
export const getMethodsLoadingStatus = () => (state) => state.methods.isLoading;
export const getMethodsError = () => (state) => state.methods.error;

export default methodsReducer;
