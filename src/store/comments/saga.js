import { call, put, takeLatest } from "redux-saga/effects";
import { performDeleteComment, performGetAllComments, deleteComment, deleteFrontComment, setComments, performAddNewComment, setUpdateComments } from "./slice";
import commentsService from "../../services/CommentsService";

function* getAllCommentsHandler(action) {
  try {
    const data = yield call(commentsService.getAll, action.payload);
    yield put(setComments(data));
  } catch (errors) {
    console.log("errors: ", errors);
  }
}

function* deleteCommentHandler(action) {
  try {
    const data = yield call(commentsService.delete, action.payload);
    yield put(deleteFrontComment(action.payload));

  } catch (errors) {
    console.log("errors: ", errors);
  }
}

function* addNewCommentHandler(action) {
  try {
    console.log(action.payload);
    const response = yield call(commentsService.add, action.payload.comment);
    yield put(setUpdateComments(response.data));
    action.payload.setFirstClick(true);
  } catch (errors) {
    console.log("errors: ", errors);
  }
}

export function* watchGetAllComments() {
  yield takeLatest(performGetAllComments.type, getAllCommentsHandler);
}

export function* watchAddNewComments() {
  yield takeLatest(performAddNewComment.type, addNewCommentHandler);
}

export function* watchDeleteComment() {
  yield takeLatest(performDeleteComment.type, deleteCommentHandler);
}
