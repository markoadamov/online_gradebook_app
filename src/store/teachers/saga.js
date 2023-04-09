import { call, put, takeLatest } from 'redux-saga/effects'
import { setActiveUserHandler, performGetAllTeachers, setTeachers, performGetSingleTeacher, setSingleTeacher, setReset } from './slice';

import teachersService from '../../services/TeachersService';

// function* setActiveUserHandler(action) {
//     try {
//         const data = yield call(teachersService.get, action.payload);
//         yield put(setActiveUser(data));
//     }
//     catch (error) {
//         console.log('error: ', error);
//     }
// }

function* getAllTeachersHandler(action) {
    try {
        yield put(setReset()); // Ovo je dodato se ne bi ucitao state sa prethodne stranice
        const data = yield call(teachersService.getAll, action.payload);
        yield put(setTeachers(data));
    }
    catch (error) {
        console.log('Aerror: ', error);
    }
}

function* getSingleTeacherHandler(action) {
    try {
        const data = yield call(teachersService.get, action.payload);
        yield put(setSingleTeacher(data));
    }
    catch (error) {
        console.log('error: ', error);
    }
}

// export function* watchSetActiveUser() {
//     yield takeLatest(performSetActiveUser.type, setActiveUserHandler);
// }

export function* watchGetAllTeachers() {
    yield takeLatest(performGetAllTeachers.type, getAllTeachersHandler);
}

export function* watchGetSingleTeacher() {
    yield takeLatest(performGetSingleTeacher.type, getSingleTeacherHandler);
}