import { all, takeLatest, put, select } from "redux-saga/effects";
import * as types from "../actions/types";
import * as questionsActions from "../actions/questionActions";
import * as questionsSelectors from "../reducers/QuestionsReducer";
import { getAllQuestions } from "../lib/api";

function* fetchQuestionsIfNeeded(action) {
  const isFetching = yield select(questionsSelectors.selectIsFetching);
  if (isFetching === null) yield put(questionsActions.requestQuestions());
}

function* fetchQuestions(action) {
  const response = yield getAllQuestions();
  yield put(questionsActions.questionsDataFetched(response));
}

// Root saga
// ----------------------------------------------------------------------------

function* questionsSaga() {
  yield all([
    takeLatest(types.QUESTIONS_REQUEST_IF_NEEDED, fetchQuestionsIfNeeded),
    takeLatest(types.QUESTIONS_FETCH, fetchQuestions)
  ]);
}

export default questionsSaga;
