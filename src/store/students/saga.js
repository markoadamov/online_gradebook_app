import { call, put, takeLatest } from 'redux-saga/effects'
import { performGetAllStudents, setStudents } from './slice';

import studentsService from '../../services/StudentsService';

function* getAllStudentsHandler(action) {
    try {
        console.log("getAllStudentsHandler action.payload:", action.payload);
        const data = yield call(studentsService.getAll, action.payload);
        console.log("getAllStudentsHandler data:", data);
        yield put(setStudents(data));
    }
    catch (error) {
        console.log('error: ', error);
    }
}

export function* watchGetAllStudents() {
    yield takeLatest(performGetAllStudents.type, getAllStudentsHandler);
}