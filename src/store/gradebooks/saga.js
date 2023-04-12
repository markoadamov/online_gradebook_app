import { call, put, takeLatest } from "redux-saga/effects";
import {
  performGetAllGradebooks,
  performGetSingleGradebook,
  setGradebooks,
  setSingleGradebook,
  performAddNewGradebook,
  setErrors,
  performDeleteGradebook,
  resetSingleGradebook,
  performEditGradebook
} from "./slice";
import gradebooksService from "../../services/GradebooksService";
import { resetActiveUserGradebookId } from "../authentication/slice";

function* getAllGradebooksHandler(action) {
  try {
    const data = yield call(gradebooksService.getAll, action.payload);
    yield put(setGradebooks(data));
  } catch (errors) {
    console.log("errors: ", errors);
  }
}

function* getSingleGradebookHandler(action) {
  try {
    const data = yield call(gradebooksService.get, action.payload);
    yield put(setSingleGradebook(data));
  } catch (errors) {
    if (errors.response.status === 404) {
      console.log("Page not found! Response: ", errors.message);
    } else {
      console.log("Errors: ", errors);
    }
  }
}

function* addNewGradebookHandler(action) {
  try {
    const data = yield call(gradebooksService.add, action.payload.data);
    if(action.payload.activeUser.id == action.payload.data.user_id)
    {
      yield put(resetActiveUserGradebookId(data.data.id));
    }
    action.payload.redirect();
  } catch (errors) {
    console.log("errors: ", errors.response.data.message);
    yield put(setErrors(errors.response.data.message));
  }
}

function* deleteGradebookHandler(action) {
  try {
    const data = yield call(gradebooksService.delete, action.payload.idToDelete);
    yield put(resetSingleGradebook());
    if(action.payload.activeUser.id === action.payload.idToDelete)
    {
      yield put(resetActiveUserGradebookId(0));
    }
    action.payload.redirect();
  } catch (errors) {
    console.log("errors: ", errors);
    yield put(setErrors(errors.response.data.errors));
  }
}

function* editGradebookHandler(action) {
  try {
    const data = yield call(gradebooksService.edit, action.payload.data);
    if(action.payload.activeUser.id != action.payload.data.gradebookToAdd.user_id)
    {
      yield put(resetActiveUserGradebookId(0));
    }
    action.payload.redirect();
  } catch (errors) {
    console.log("errors: ", errors);
    yield put(setErrors(errors.response.data.errors));
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

export function* watchDeleteGradebook() {
  yield takeLatest(performDeleteGradebook.type, deleteGradebookHandler);
}

export function* watchEditGradebook() {
  yield takeLatest(performEditGradebook.type, editGradebookHandler);
}
