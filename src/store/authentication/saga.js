import { call, put, takeLatest } from "redux-saga/effects";
import authService from "../../services/AuthService";
import {
  setActiveUser,
  setErrors,
  setErrorReset,
  performRegister,
  performLogin,
  performLogout,
  performErrorReset,
  performSetActiveUser,
} from "./slice";

function* registerHandler(action) {
  try {
    const data = yield call(authService.register, action.payload.data);
    yield put(setActiveUser(data));
    action.payload.redirect();
  } catch (errors) {
    console.log("errors: ", errors);
    yield put(setErrors(errors.response.data.errors));
  }
}

function* loginHandler(action) {
  try {
    const data = yield call(authService.login, action.payload.data);
    yield put(setActiveUser(data));
    action.payload.redirect();
  } catch (errors) {
    console.log("errors: ", errors);
    yield put(setErrors(errors.response.data));
  }
}

function* logoutHandler(action) {
  try {
    yield call(authService.logout, action.payload);
  } catch (errors) {
    console.log("errors: ", errors);
    yield put(setErrors(errors.response.data));
  }
}

function* setActiveUserHandler(action) {
  try {
    const data = yield call(authService.getActiveUser, action.payload);
    yield put(setActiveUser(data));
  } catch (errors) {
    console.log("errors: ", errors);
    yield put(setErrors(errors.response.data));
  }
}

function* errorResetHandler() {
  try {
    yield put(setErrorReset());
  } catch (errors) {
    console.log("errors: ", errors);
  }
}

export function* watchRegister() {
  yield takeLatest(performRegister.type, registerHandler);
}

export function* watchLogin() {
  yield takeLatest(performLogin.type, loginHandler);
}

export function* watchLogout() {
  yield takeLatest(performLogout.type, logoutHandler);
}

export function* watchErrorReset() {
  yield takeLatest(performErrorReset.type, errorResetHandler);
}

export function* watchSetActiveUser() {
  yield takeLatest(performSetActiveUser.type, setActiveUserHandler);
}
