import { createSlice } from "@reduxjs/toolkit";

const middlewareActions = {
  performGetAllComments: () => {},
  performDeleteComment: () => {},
  performAddNewComment: () => {},
};

const commentsSlice = createSlice({
  name: "comment",
  initialState: {
    data: [],
    current_and_total_comment_count: [],
    errors: []
  },
  reducers: {
    setComments: (state, action) => {
      state.data = action.payload;
    },
    setUpdateComments: (state, action) => {
      state.data = [...state.data, action.payload]
    },
    deleteFrontComment: (state, action) => {
      state.data = state.data.filter((comment) => comment.id !== action.payload);
    },
    setErrors: (state, action) => {
      state.errors = action.payload;
    },
    
    ...middlewareActions,
  },
});

export const { deleteFrontComment, setUpdateComments, setComments, performGetAllComments, performAddNewComment, performDeleteComment } =
  commentsSlice.actions;

export default commentsSlice.reducer;
