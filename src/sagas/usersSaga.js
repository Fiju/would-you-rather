import { all, takeLatest, put, select } from "redux-saga/effects";
import * as types from "../actions/types";
import * as usersActions from "../actions/usersActions";
import * as usersSelectors from "../reducers/UsersReducer";
import { getAllUsers } from "../lib/api";

function* fetchUsersIfNeeded(action) {
  const isFetching = yield select(usersSelectors.selectIsFetching);
  if (isFetching === null) yield put(usersActions.requestUsers());
}

function* fetchUsers(action) {
  const response = yield getAllUsers();
  yield put(usersActions.usersDataFetched(response));
}

// Root saga
// ----------------------------------------------------------------------------

function* usersSaga() {
  yield all([
    takeLatest(types.USER_REQUEST_IF_NEEDED, fetchUsersIfNeeded),
    takeLatest(types.USER_FETCH, fetchUsers)
  ]);
}

export default usersSaga;
