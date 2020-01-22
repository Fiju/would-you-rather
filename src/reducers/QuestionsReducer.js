import { createSelector } from "reselect";

import * as types from "../actions/types";

const moviesInitialState = {
  isLoading: null,
  avilableQuestions: {}
};

export default (state = moviesInitialState, { type, payload }) => {
  switch (type) {
    case types.QUESTIONS_FETCH:
      return { ...state, isLoading: true };
    case types.QUESTIONS_FETCH_SUCCESS:
      return { ...state, avilableQuestions: payload, isLoading: false };
    case types.QUESTIONS_ADD_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case types.QUESTIONS_ADD_REQUEST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        avilableQuestions: { ...state.avilableQuestions, [payload.id]: payload }
      };

    case types.QUESTION_SAVE_ANSWER: {
      return {
        ...state,
        isLoading: true
      };
    }
    case types.QUESTION_SAVE_ANSWER_SUCCESS: {
      return {
        ...state,
        isLoading: false
      };
    }
    default:
      return state;
  }
};

function selectLocalState(globalState) {
  return globalState.questions;
}

export function selectIsFetching(globalState) {
  const state = selectLocalState(globalState);
  return state.isLoading;
}

const selectQuestionsById = createSelector(
  selectLocalState,
  state => state.avilableQuestions
);

export const selectQuestion = createSelector(selectLocalState, state =>
  Object.values(state.avilableQuestions)
);

export const selectQuestionById = (globalState, id) => {
  return selectQuestionsById(globalState)[id];
};
