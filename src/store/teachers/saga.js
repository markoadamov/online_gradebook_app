import { call, put, takeLatest } from "redux-saga/effects";
import {
  performGetAllTeachers,
  setTeachers,
  performGetSingleTeacher,
  setSingleTeacher,
  setReset,
} from "./slice";

import teachersService from "../../services/TeachersService";

function* getAllTeachersHandler(action) {
  try {
    yield put(setReset()); // Ovo je dodato se ne bi ucitao state sa prethodne stranice
    const data = yield call(teachersService.getAll, action.payload);
    yield put(setTeachers(data));
  } catch (errors) {
    console.log("errors: ", errors);
  }
}

function* getSingleTeacherHandler(action) {
  try {
    const data = yield call(teachersService.get, action.payload);
    yield put(setSingleTeacher(data));
  } catch (errors) {
    console.log("errors: ", errors);
  }
}

export function* watchGetAllTeachers() {
  yield takeLatest(performGetAllTeachers.type, getAllTeachersHandler);
}

export function* watchGetSingleTeacher() {
  yield takeLatest(performGetSingleTeacher.type, getSingleTeacherHandler);
}
