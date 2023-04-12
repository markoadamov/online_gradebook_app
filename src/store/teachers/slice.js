import { createSlice } from "@reduxjs/toolkit";

const middlewareActions = {
  performGetAllTeachers: () => {},
  performGetSingleTeacher: () => {},
};

const teachersSlice = createSlice({
  name: "teacher",
  initialState: {
    active_user: [],
    data: [],
    single_teacher: [],
  },
  reducers: {
    setActiveUser: (state, action) => {
      state.active_user = action.payload.data;
    },
    setTeachers: (state, action) => {
      state.data = action.payload.data;
    },
    setSingleTeacher: (state, action) => {
      state.single_teacher = action.payload;
    },
    setReset: (state, action) => {
      state.data = [];
    },

    ...middlewareActions,
  },
});

export const {
  setActiveUser,
  setReset,
  setTeachers,
  performGetAllTeachers,
  setSingleTeacher,
  performGetSingleTeacher,
} = teachersSlice.actions;

export default teachersSlice.reducer;
