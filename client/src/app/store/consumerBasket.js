import { createSlice } from "@reduxjs/toolkit";

const consumerBusketSlice = createSlice({
  name: "consumerBusket",
  initialState: {
    entities: []
  },
  reducers: {
    itemAdded: (state, action) => {
      state.entities.push(action.payload);
    },
    itemEdited: (state, action) => {
      const editedItemIndex = state.entities.findIndex(
        (u) => u._id === action.payload._id
      );
      state.entities[editedItemIndex] = action.payload;
    },
    itemRemoved: (state, action) => {
      state.entities = state.entities.filter((i) => i._id !== action.payload);
    },
    itemReset: (state) => {
      state.entities = [];
    },
    itemBackuped: (state, action) => {
      state.entities = action.payload;
    }
  }
});

const { reducer: consumerBusketreducer, actions } = consumerBusketSlice;
const { itemAdded, itemEdited, itemRemoved, itemReset, itemBackuped } = actions;

export const storeAdding = (payload) => (dispatch) => {
  dispatch(itemAdded(payload));
};
export const editItemBasket = (payload) => (dispatch) => {
  dispatch(itemEdited(payload));
};
export const deleteItem = (itemId) => (dispatch) => {
  dispatch(itemRemoved(itemId));
};
export const resetBasket = () => (dispatch) => {
  dispatch(itemReset());
};
export const backupBasket = (items) => (dispatch) => {
  dispatch(itemBackuped(items));
};
export const getStore = () => (state) => state.consumerBusket.entities;

export default consumerBusketreducer;
