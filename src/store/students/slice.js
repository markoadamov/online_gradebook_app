import { createSlice } from "@reduxjs/toolkit";

const middlewareActions = {
  performGetAllStudents: () => {},
  performAddNewStudent: () => {},
  performDeleteStudent: () => {},
};

const studentsSlice = createSlice({
  name: "student",
  initialState: {
    data: [],
    selectedStudentsForDelete: [],
    errors: [],
  },
  reducers: {
    setStudents: (state, action) => {
      state.data = action.payload;
    },
    setErrors: (state, action) => {
      state.errors = action.payload;
    },
    deleteFrontStudent: (state, action) => {
      state.data = state.data.filter(
        (student) => student.id !== action.payload
      );
    },

    ...middlewareActions,
  },
});

export const {
  deleteFrontStudent,
  selectedStudent,
  setDeselectedStudent,
  setStudents,
  setErrors,
  performGetAllStudents,
  performAddNewStudent,
  performDeleteStudent,
} = studentsSlice.actions;

export default studentsSlice.reducer;
