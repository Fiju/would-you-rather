import { createSelector } from "reselect";

import * as types from "../actions/types";

const moviesInitialState = {
  isFetching: null,
  avilableQuestions: {}
};

export default (state = moviesInitialState, { type, payload }) => {
  switch (type) {
    case types.QUESTIONS_FETCH:
      return { ...state, isFetching: true };
    case types.QUESTIONS_FETCH_SUCCESS:
      return { ...state, avilableQuestions: payload, isFetching: false };
    case types.QUESTIONS_ADD_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case types.QUESTIONS_ADD_REQUEST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        avilableQuestions: { ...state.avilableQuestions, payload }
      };
    default:
      return state;
  }
};

function selectLocalState(globalState) {
  return globalState.questions;
}

export function selectIsFetching(globalState) {
  const state = selectLocalState(globalState);
  return state.isFetching;
}

export const selectQuestion = createSelector(selectLocalState, state =>
  Object.values(state.avilableQuestions)
);