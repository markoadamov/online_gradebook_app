import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import gradebooksReducer from "./gradebooks/slice";
import createSagaMiddleware from "@redux-saga/core"
import { watchGetAllGradebooks } from "./gradebooks/saga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore ({
    reducer: {
        gradebooks: gradebooksReducer,
    },
    middleware: (getDefaultMiddleware) => {
        return [
            ...getDefaultMiddleware(),
            sagaMiddleware
        ]
    }
});

sagaMiddleware.run(watchGetAllGradebooks)

export default store;