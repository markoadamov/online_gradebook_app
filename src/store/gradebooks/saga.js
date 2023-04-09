import { call, put, takeLatest } from 'redux-saga/effects';
import { performGetAllGradebooks, performGetSingleGradebook, setGradebooks, setSingleGradebook, performAddNewGradebook, setErrors } from './slice';
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
        if(error.response.status === 404)
        {
        console.log('Page not found! Response: ', error.message);
        }
    }
}

function* addNewGradebookHandler(action) {

    try {
        const data = yield call(gradebooksService.add, action.payload);
        console.log("Data in setNewGradebookHandler:",data);
        window.location.href = "/gradebooks";
    }
    catch (errors) {
        console.log('errors: ', errors.response.data.message);
        yield put(setErrors(errors.response.data.message));
    }
}


export function* watchGetAllGradebooks() {
    yield takeLatest(performGetAllGradebooks.type, getAllGradebooksHandler);
}

export function* watchGetSingleGradebook() {
    yield takeLatest(performGetSingleGradebook.type, getSingleGradebookHandler);
}

export function* watchAddNewGradebook() {
    yield takeLatest(performAddNewGradebook.type, addNewGradebookHandler);
}