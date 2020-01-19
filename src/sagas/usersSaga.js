import { all, takeLatest, put, select } from "redux-saga/effects";
import * as types from "../actions/types";
import * as usersActions from "../actions/usersActions";
import * as usersSelectors from "../reducers/UsersReducer";
import { getAllUsers, addNewUser } from "../lib/api";

function* fetchUsersIfNeeded(action) {
  const isFetching = yield select(usersSelectors.selectIsFetching);
  if (isFetching === null) yield put(usersActions.requestUsers());
}

function* fetchUsers(action) {
  const response = yield getAllUsers();
  yield put(usersActions.usersDataFetched(response));
}

function* addNewUserSuccess(response, newUser) {
  yield put(usersActions.usersDataFetched(response));
  yield put(usersActions.userLogin(newUser.id));
}

function* addUser(action) {
  const newUser = {
    ...action.payload,
    id: action.payload.username,
    answers: {},
    questions: []
  };
  const response = yield addNewUser(newUser);
  if (response) {
    yield addNewUserSuccess(response, newUser);
    action.res();
  }
}

// Root saga
// ----------------------------------------------------------------------------

function* usersSaga() {
  yield all([
    takeLatest(types.USER_REQUEST_IF_NEEDED, fetchUsersIfNeeded),
    takeLatest(types.USER_FETCH, fetchUsers),
    takeLatest(types.USERS_ADD_NEW_REQUEST, addUser)
  ]);
}

export default usersSaga;
