import { createSlice } from "@reduxjs/toolkit";

const middlewareActions = {
  performGetAllGradebooks: () => {},
};

const gradebooksSlice = createSlice({
  name: "gradebook",
  initialState: {
    data: [],
    current_and_total_gradebook_count: [],
  },
  reducers: {
    setGradebooks: (state, action) => {
      console.log("Action payload test:", action.payload);
      state.data = action.payload.data;

      state.current_and_total_gradebook_count[0]=action.payload.to; //current count
      state.current_and_total_gradebook_count[1]=action.payload.total; //total count
    },

    ...middlewareActions,
  },
});

export const { setGradebooks, performGetAllGradebooks } =
  gradebooksSlice.actions;

export default gradebooksSlice.reducer;
