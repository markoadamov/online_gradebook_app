import { createSlice } from "@reduxjs/toolkit";

const middlewareActions = {
  performGetAllGradebooks: () => {},
  performGetSingleGradebook: () => {},
  performAddNewGradebook: () => {},
};

const gradebooksSlice = createSlice({
  name: "gradebook",
  initialState: {
    data: [],
    current_and_total_gradebook_count: [],
    single_gradebook: [],
    errors: []
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
    setErrors: (state, action) => {
      state.errors = action.payload;
    },
    

    ...middlewareActions,
  },
});

export const { setErrors, setGradebooks, performGetAllGradebooks, setSingleGradebook, performGetSingleGradebook, performAddNewGradebook } =
  gradebooksSlice.actions;

export default gradebooksSlice.reducer;
