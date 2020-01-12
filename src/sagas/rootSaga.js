import { fork, all } from "redux-saga/effects";
import usersSaga from "./usersSaga";
import questionsSaga from "./questionsSaga";

export default function* rootSaga() {
  yield all([fork(usersSaga), fork(questionsSaga)]);
}
