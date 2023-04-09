import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import gradebooksReducer from "./gradebooks/slice";
import teachersReducer from "./teachers/slice";
import studentsReducer from "./students/slice";
import createSagaMiddleware from "@redux-saga/core"
import { watchGetAllGradebooks, watchGetSingleGradebook, watchAddNewGradebook } from "./gradebooks/saga";
import { watchGetAllTeachers, watchGetSingleTeacher } from "./teachers/saga";
import { watchGetAllStudents } from "./students/saga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore ({
    reducer: {
        gradebooks: gradebooksReducer,
        teachers: teachersReducer,
        students: studentsReducer,
    },
    middleware: (getDefaultMiddleware) => {
        return [
            ...getDefaultMiddleware(),
            sagaMiddleware
        ]
    }
});

sagaMiddleware.run(watchGetAllGradebooks);
sagaMiddleware.run(watchGetSingleGradebook);
sagaMiddleware.run(watchGetSingleTeacher);
sagaMiddleware.run(watchGetAllTeachers);
sagaMiddleware.run(watchGetAllStudents);
sagaMiddleware.run(watchAddNewGradebook);

export default store;