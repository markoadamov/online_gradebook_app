import { createSlice } from "@reduxjs/toolkit";

const middlewareActions = {
  performGetAllGradebooks: () => {},
  performGetSingleGradebook: () => {},
  performAddNewGradebook: () => {},
  performDeleteGradebook: () => {},
  performEditGradebook: () => {},
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
      state.data = action.payload.data;
      state.current_and_total_gradebook_count[0]=action.payload.to; //current count
      state.current_and_total_gradebook_count[1]=action.payload.total; //total count
    },
    setSingleGradebook: (state, action) => {
      state.single_gradebook = action.payload;
    },
    setErrors: (state, action) => {
      state.errors = action.payload;
    },
    resetSingleGradebook: (state, action) => {
      state.single_gradebook = [];
    },
    
    ...middlewareActions,
  },
});

export const { resetSingleGradebook, setErrors, setGradebooks, performGetAllGradebooks, setSingleGradebook, performGetSingleGradebook, performAddNewGradebook, performDeleteGradebook, performEditGradebook } =
  gradebooksSlice.actions;

export default gradebooksSlice.reducer;
