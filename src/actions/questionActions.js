import * as types from "./types";

export function requestQuestionsIfNeeded() {
  return {
    type: types.QUESTIONS_REQUEST_IF_NEEDED
  };
}

export const requestQuestions = () => ({
  type: types.QUESTIONS_FETCH
});

export const questionsDataFetched = questions => ({
  type: types.QUESTIONS_FETCH_SUCCESS,
  payload: questions
});
