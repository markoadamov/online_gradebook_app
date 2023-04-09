import { createSlice } from "@reduxjs/toolkit";

const middlewareActions = {
  performGetAllStudents: () => {},
};

const studentsSlice = createSlice({
  name: "student",
  initialState: {
    data: [],
  },
  reducers: {
    setStudents: (state, action) => {
      console.log("Student Action payload test:", action.payload);
      state.data = action.payload;
    },

    ...middlewareActions,
  },
});

export const { setStudents, performGetAllStudents } = studentsSlice.actions;

export default studentsSlice.reducer;
