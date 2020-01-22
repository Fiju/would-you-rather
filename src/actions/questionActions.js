import * as types from "./types";

export const requestQuestionsIfNeeded = () => {
  return {
    type: types.QUESTIONS_REQUEST_IF_NEEDED
  };
};

export const requestQuestions = () => ({
  type: types.QUESTIONS_FETCH
});

export const questionsDataFetched = questions => ({
  type: types.QUESTIONS_FETCH_SUCCESS,
  payload: questions
});

export const requestSaveQuestion = question => ({
  type: types.QUESTIONS_ADD_REQUEST,
  payload: question
});

export const addSavedQuestion = question => ({
  type: types.QUESTIONS_ADD_REQUEST_SUCCESS,
  payload: question
});

export const saveAnswer = (authedUser, qid, answer) => ({
  type: types.QUESTION_SAVE_ANSWER,
  payload: { authedUser, qid, answer }
});
