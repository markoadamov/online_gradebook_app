import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import gradebooksReducer from "./gradebooks/slice";
import teachersReducer from "./teachers/slice";
import createSagaMiddleware from "@redux-saga/core"
import { watchGetAllGradebooks, watchGetSingleGradebook } from "./gradebooks/saga";
import { watchGetAllTeachers } from "./teachers/saga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore ({
    reducer: {
        gradebooks: gradebooksReducer,
        teachers: teachersReducer,
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
sagaMiddleware.run(watchGetAllTeachers);

export default store;