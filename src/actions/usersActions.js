import * as types from "./types";

export function requestUsersIfNeeded() {
  return {
    type: types.USER_REQUEST_IF_NEEDED
  };
}

export const requestUsers = () => ({
  type: types.USER_FETCH
});

export const usersDataFetched = users => ({
  type: types.USERS_FETCH_SUCCESS,
  payload: users
});

export const userLogin = id => ({
  type: types.USER_LOGIN,
  payload: id
});

export const addUser = (form, res) => ({
  type: types.USERS_ADD_NEW_REQUEST,
  payload: form,
  res
});
