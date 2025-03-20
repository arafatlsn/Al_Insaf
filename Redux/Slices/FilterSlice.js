const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  filterOrders: {
    filter: "",
    search: "",
  },
  filterProducts: {
    filter: "",
    search: "",
  },
};

export const FilterSlice = createSlice({
  name: "filter_slice",
  initialState,
  reducers: {
    updateOrderFilter: (state, action) => {
      const actionPayload = action.payload;
      state[actionPayload.actionFor] = actionPayload?.value;
    },
  },
});

export const { updateOrderFilter } = FilterSlice.actions;
export default FilterSlice.reducer;
