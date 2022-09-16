import { createSlice } from "@reduxjs/toolkit";
import coffeeItemService from "../service/coffeeItem.service";

const coffeeItemsSlice = createSlice({
  name: "coffeeItems",
  initialState: {
    entities: null,
    isLoading: true,
    error: null
  },
  reducers: {
    coffeeItemsRequested: (state) => {
      state.isLoading = true;
    },
    coffeeItemsReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    coffeeItemsRequestFeild: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    itemRemoved: (state, action) => {
      state.entities = state.entities.filter((i) => i._id !== action.payload);
    }
  }
});

const { reducer: coffeeItemsReducer, actions } = coffeeItemsSlice;
const {
  coffeeItemsRequested,
  coffeeItemsReceived,
  coffeeItemsRequestFeild,
  itemRemoved
} = actions;

export const loadCoffeeItemsList = () => async (dispatch) => {
  dispatch(coffeeItemsRequested());
  try {
    const { content } = await coffeeItemService.get();
    dispatch(coffeeItemsReceived(content));
  } catch (error) {
    dispatch(coffeeItemsRequestFeild(error.message));
  }
};

export const coffeeItemRemove = (itemId) => async (dispatch) => {
  try {
    const { content } = await coffeeItemService.remove(itemId);
    if (content === null) {
      dispatch(itemRemoved());
    }
  } catch (error) {
    dispatch(coffeeItemsRequestFeild(error.message));
  }
};

export const getCoffeeItemsList = () => (state) => state.coffeeItems.entities;
export const getCoffeeItemsLoadingStatus = () => (state) =>
  state.coffeeItems.isLoading;
export const getCoffeeItemsError = () => (state) => state.coffeeItems.error;

export default coffeeItemsReducer;
