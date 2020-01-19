import { all, takeLatest, put, select } from "redux-saga/effects";
import * as types from "../actions/types";
import * as questionsActions from "../actions/questionActions";
import * as questionsSelectors from "../reducers/QuestionsReducer";
import { getAllQuestions, saveQuestion, saveQuestionAnswer } from "../lib/api";

function* fetchQuestionsIfNeeded(action) {
  const isFetching = yield select(questionsSelectors.selectIsFetching);
  if (isFetching === null) yield put(questionsActions.requestQuestions());
}

function* fetchQuestions(action) {
  const response = yield getAllQuestions();
  yield put(questionsActions.questionsDataFetched(response));
}

function* addQuestion(action) {
  const response = yield saveQuestion(action.payload);
  yield put(questionsActions.addSavedQuestion(response));
}

function* saveAnswer(action) {
  const response = yield saveQuestionAnswer(action.payload);
  yield fetchQuestions();
  yield put({ type: types.USER_FETCH });
  // yield put({
  //   type: types.QUESTION_SAVE_ANSWER_SUCCESS,
  //   pyaload: action.payload
  // });
}

// Root saga
// ----------------------------------------------------------------------------

function* questionsSaga() {
  yield all([
    takeLatest(types.QUESTIONS_REQUEST_IF_NEEDED, fetchQuestionsIfNeeded),
    takeLatest(types.QUESTIONS_FETCH, fetchQuestions),
    takeLatest(types.QUESTIONS_ADD_REQUEST, addQuestion),
    takeLatest(types.QUESTION_SAVE_ANSWER, saveAnswer)
  ]);
}

export default questionsSaga;
