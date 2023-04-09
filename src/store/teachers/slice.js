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
      //console.log("Action payload test:", action.payload);
      state.active_user = action.payload.data;
    },
    setTeachers: (state, action) => {
      //console.log("Action payload test:", action.payload);
      state.data = action.payload.data;
    },
    setSingleTeacher: (state, action) => {
      console.log("setSingleTeacher:",action.payload);
      state.single_teacher = action.payload;
      console.log("setSingleTeacher State:", state.single_teacher);
    },
    setReset: (state, action) => {
      //console.log("Action payload test:", action.payload);
      state.data = [];
    },

    ...middlewareActions,
  },
});

export const { setActiveUser, setReset, setTeachers, performGetAllTeachers, setSingleTeacher, performGetSingleTeacher } = teachersSlice.actions;

export default teachersSlice.reducer;
