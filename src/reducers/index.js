import { combineReducers } from "redux";
import UserReducer from "./UsersReducer";

export default combineReducers({
  users: UserReducer
});
