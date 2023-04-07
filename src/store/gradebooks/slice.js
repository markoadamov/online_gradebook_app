import { createSlice } from "@reduxjs/toolkit";

const middlewareActions = {
  performGetAllGradebooks: () => {},
};

const gradebooksSlice = createSlice({
  name: "gradebook",
  initialState: {
    data: [],
  },
  reducers: {
    setGradebooks: (state, action) => {
      console.log("Action payload test:", action.payload);
      state.data = action.payload;
    },

    ...middlewareActions,
  },
});

export const { setGradebooks, performGetAllGradebooks } =
  gradebooksSlice.actions;

export default gradebooksSlice.reducer;
