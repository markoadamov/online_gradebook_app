import { call, put, takeLatest } from 'redux-saga/effects'
import { performGetAllGradebooks, performGetSingleGradebook, setGradebooks, setSingleGradebook } from './slice';

import gradebooksService from '../../services/GradebooksService';

function* getAllGradebooksHandler(action) {

    try {
        //console.log("getAllGradebooksHandler TEST");
        const data = yield call(gradebooksService.getAll, action.payload);
        yield put(setGradebooks(data));
    }
    catch (error) {
        console.log('error: ', error);
    }
}

function* getSingleGradebookHandler(action) {

    try {
        const data = yield call(gradebooksService.get, action.payload);
        console.log("Data in getSingleGradebookHandler:",data);
        yield put(setSingleGradebook(data));
    }
    catch (error) {
        console.log('error: ', error);
    }
}


export function* watchGetAllGradebooks() {
    yield takeLatest(performGetAllGradebooks.type, getAllGradebooksHandler);
}

export function* watchGetSingleGradebook() {
    yield takeLatest(performGetSingleGradebook.type, getSingleGradebookHandler);
}