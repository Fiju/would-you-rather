import { createSelector } from "reselect";

import * as types from "../actions/types";

const usersInitialState = {
  isFetching: null,
  subscribedUsers: {},
  loggedInUser: {}
};

export default (state = usersInitialState, { type, payload }) => {
  switch (type) {
    case types.USER_FETCH:
      return { ...state, isFetching: true };
    case types.USERS_FETCH_SUCCESS:
      return { ...state, subscribedUsers: payload };
    case types.USER_LOGIN:
      return {
        ...state,
        loggedInUser: state.subscribedUsers[payload]
      };
    default:
      return state;
  }
};

function selectLocalState(globalState) {
  return globalState.users;
}

export function selectIsFetching(globalState) {
  const state = selectLocalState(globalState);
  return state.isFetching;
}

export const selectSubscribedUsers = createSelector(selectLocalState, state =>
  Object.values(state.subscribedUsers)
);
