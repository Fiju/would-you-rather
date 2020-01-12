import { combineReducers } from "redux";
import UserReducer from "./UsersReducer";
import QuestionsReducer from "./QuestionsReducer";

export default combineReducers({
  users: UserReducer,
  questions: QuestionsReducer
});
