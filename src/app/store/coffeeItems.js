import { createSlice, createAction } from "@reduxjs/toolkit";
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
    coffeeItemCreated: (state, action) => {
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
      state.entities.push(action.payload);
    },
    coffeeItemRemoved: (state, action) => {
      state.entities = state.entities.filter((i) => i._id !== action.payload);
    }
  }
});

const { reducer: coffeeItemsReducer, actions } = coffeeItemsSlice;
const {
  coffeeItemsRequested,
  coffeeItemsReceived,
  coffeeItemsRequestFeild,
  coffeeItemRemoved,
  coffeeItemCreated
} = actions;

const itemCreateRequested = createAction("coffeeItems/brandCreateRequested");
const createItemFaild = createAction("coffeeItems/createItemFaild");

export const loadCoffeeItemsList = () => async (dispatch) => {
  dispatch(coffeeItemsRequested());
  try {
    const { content } = await coffeeItemService.get();
    dispatch(coffeeItemsReceived(content));
  } catch (error) {
    dispatch(coffeeItemsRequestFeild(error.message));
  }
};

export const createNewCoffeeItem = (payload) => async (dispatch) => {
  dispatch(itemCreateRequested());
  try {
    const { content } = await coffeeItemService.create(payload);
    dispatch(coffeeItemCreated(content));
  } catch (error) {
    dispatch(createItemFaild());
  }
};

export const coffeeItemRemove = (itemId) => async (dispatch) => {
  try {
    const { content } = await coffeeItemService.remove(itemId);
    if (content === null) {
      dispatch(coffeeItemRemoved(itemId));
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
