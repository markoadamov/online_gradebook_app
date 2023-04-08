import { createSlice } from "@reduxjs/toolkit";

const middlewareActions = {
  performGetAllTeachers: () => {},
};

const teachersSlice = createSlice({
  name: "teacher",
  initialState: {
    data: [],
  },
  reducers: {
    setTeachers: (state, action) => {
      //console.log("Action payload test:", action.payload);
      state.data = action.payload.data;
    },

    ...middlewareActions,
  },
});

export const { setTeachers, performGetAllTeachers } = teachersSlice.actions;

export default teachersSlice.reducer;
