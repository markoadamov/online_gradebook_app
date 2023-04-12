import { createSlice } from "@reduxjs/toolkit";

const middlewareActions = {
  performRegister: () => {},
  performLogin: () => {},
  performLogout: () => {},
  performErrorReset: () => {},
  performSetActiveUser: () => {},
};

const authenticationSlice = createSlice({
  name: "authentication",
  initialState: {
    active_user: [],
    errors: []
  },
  reducers: {
    setActiveUser: (state, action) => {
      state.active_user = action.payload;
    },
    setErrors: (state, action) => {
      state.errors = action.payload;
    },
    setErrorReset: (state, action) => {
      state.errors = [];
    },
    resetActiveUserGradebookId: (state, action) => {
      console.log("ID TO SET:", action.payload)
      state.active_user = {...state.active_user, gradebook_id: action.payload};
    },
    
    
    ...middlewareActions,
  },
});

export const {
  resetActiveUserGradebookId,
  setErrors,
  setErrorReset,
  setActiveUser,
  performRegister,
  performLogin,
  performLogout,
  performErrorReset,
  performSetActiveUser,
} = authenticationSlice.actions;

export default authenticationSlice.reducer;
