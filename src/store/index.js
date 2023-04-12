import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import gradebooksReducer from "./gradebooks/slice";
import teachersReducer from "./teachers/slice";
import studentsReducer from "./students/slice";
import commentsReducer from "./comments/slice";
import authenticationReducer from "./authentication/slice";
import createSagaMiddleware from "@redux-saga/core";
import {
  watchGetAllGradebooks,
  watchGetSingleGradebook,
  watchAddNewGradebook,
  watchDeleteGradebook,
  watchEditGradebook
} from "./gradebooks/saga";
import { watchGetAllTeachers, watchGetSingleTeacher } from "./teachers/saga";
import { watchGetAllStudents, watchAddNewStudent, watchDeleteStudent } from "./students/saga";
import {
  watchRegister,
  watchLogin,
  watchLogout,
  watchErrorReset,
  watchSetActiveUser,
} from "./authentication/saga";
import { watchGetAllComments, watchAddNewComments, watchDeleteComment } from "./comments/saga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    gradebooks: gradebooksReducer,
    teachers: teachersReducer,
    students: studentsReducer,
    authentication: authenticationReducer,
    comments: commentsReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return [
      ...getDefaultMiddleware({
        serializableCheck: false
      }),
      sagaMiddleware,
    ];
  },
});

sagaMiddleware.run(watchRegister);
sagaMiddleware.run(watchLogin);
sagaMiddleware.run(watchLogout);
sagaMiddleware.run(watchErrorReset);
sagaMiddleware.run(watchGetAllGradebooks);
sagaMiddleware.run(watchGetSingleGradebook);
sagaMiddleware.run(watchDeleteGradebook);
sagaMiddleware.run(watchEditGradebook);
sagaMiddleware.run(watchGetSingleTeacher);
sagaMiddleware.run(watchGetAllTeachers);
sagaMiddleware.run(watchGetAllStudents);
sagaMiddleware.run(watchDeleteStudent);
sagaMiddleware.run(watchAddNewGradebook);
sagaMiddleware.run(watchSetActiveUser);
sagaMiddleware.run(watchAddNewStudent);
sagaMiddleware.run(watchGetAllComments);
sagaMiddleware.run(watchAddNewComments);
sagaMiddleware.run(watchDeleteComment);

export default store;
