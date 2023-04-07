import { call, put, takeLatest } from 'redux-saga/effects'
import { performGetAllGradebooks, setGradebooks } from './slice';

import gradebooksService from '../../services/GradebooksService';

function* getAllGradebooksHandler(action) {

    try {
        console.log("Akcija",action);
        const data = yield call(gradebooksService.getAll, action.payload);
        yield put(setGradebooks(data));
    }
    catch (error) {
        console.log('error: ', error);
    }
}


export function* watchGetAllGradebooks() {
    yield takeLatest(performGetAllGradebooks.type, getAllGradebooksHandler);
}