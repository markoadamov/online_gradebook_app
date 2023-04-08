import { call, put, takeLatest } from 'redux-saga/effects'
import { performGetAllTeachers, setTeachers } from './slice';

import teachersService from '../../services/TeachersService';

function* getAllTeachersHandler(action) {
    try {
        const data = yield call(teachersService.getAll, action.payload);
        yield put(setTeachers(data));
    }
    catch (error) {
        console.log('error: ', error);
    }
}

export function* watchGetAllTeachers() {
    yield takeLatest(performGetAllTeachers.type, getAllTeachersHandler);
}