import { createSlice } from "@reduxjs/toolkit";

const middlewareActions = {
  performGetAllGradebooks: () => {},
  performGetSingleGradebook: () => {},
};

const gradebooksSlice = createSlice({
  name: "gradebook",
  initialState: {
    data: [],
    current_and_total_gradebook_count: [],
    single_gradebook: [],
  },
  reducers: {
    setGradebooks: (state, action) => {
      //console.log("Action payload test:", action.payload);
      state.data = action.payload.data;

      state.current_and_total_gradebook_count[0]=action.payload.to; //current count
      state.current_and_total_gradebook_count[1]=action.payload.total; //total count
    },
    setSingleGradebook: (state, action) => {
      console.log("setSingleGradebook:",action.payload);
      state.single_gradebook = action.payload;
      console.log("setSingleGradebook State:", state.single_gradebook);
    },

    ...middlewareActions,
  },
});

export const { setGradebooks, performGetAllGradebooks, setSingleGradebook, performGetSingleGradebook } =
  gradebooksSlice.actions;

export default gradebooksSlice.reducer;
