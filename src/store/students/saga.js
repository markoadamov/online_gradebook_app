import { call, put, takeLatest } from 'redux-saga/effects'
import { performGetAllStudents, setStudentErrorReset, performStudentErrorReset, performDeleteStudent, deleteFrontStudent, setStudents, performAddNewStudent, setErrors } from './slice';

import studentsService from '../../services/StudentsService';

function* getAllStudentsHandler(action) {
    try {
        const data = yield call(studentsService.getAll, action.payload);
        yield put(setStudents(data));
    }
    catch (errors) {
        console.log('errors: ', errors);
    }
}

function* addNewStudentHandler(action) {
    try {
        const data = yield call(studentsService.add, action.payload.data);
        action.payload.redirect();
    }
    catch (errors) {
        console.log('errors: ', errors.response.data.errors);
        yield put(setErrors(errors.response.data.errors));;
    }
}

function* deleteStudentHandler(action) {
    try {
      const data = yield call(studentsService.delete, action.payload);
      yield put(deleteFrontStudent(action.payload));
  
    } catch (errors) {
      console.log("errors: ", errors);
    }
  }

  function* errorResetHandler() {
    try {
      yield put(setStudentErrorReset());
    } catch (errors) {
      console.log("errors: ", errors);
    }
  }

export function* watchGetAllStudents() {
    yield takeLatest(performGetAllStudents.type, getAllStudentsHandler);
}

export function* watchAddNewStudent() {
    yield takeLatest(performAddNewStudent.type, addNewStudentHandler);
}

export function* watchDeleteStudent() {
    yield takeLatest(performDeleteStudent.type, deleteStudentHandler);
}

export function* watchStudentErrorReset() {
  yield takeLatest(performStudentErrorReset.type, errorResetHandler);
}