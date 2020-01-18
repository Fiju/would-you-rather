import React, { useState } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import withQuestions from "../../containers/withQuestions";
import { selectQuestion } from "../../reducers/QuestionsReducer";
import { selectLoggedInUser } from "../../reducers/UsersReducer";
import Loader from "../Loader";
import { PollItem } from "./PollItem";
import withUsers from "../../containers/withUsers";

const mapStateToProps = state => {
  const questions = selectQuestion(state);
  const loggedInUser = selectLoggedInUser(state).id;
  const answeredQuestion = questions.filter(
    question =>
      question.optionOne.votes.includes(loggedInUser) ||
      question.optionTwo.votes.includes(loggedInUser)
  );
  const unansweredQuestion = questions.filter(
    question =>
      !question.optionOne.votes.includes(loggedInUser) &&
      !question.optionTwo.votes.includes(loggedInUser)
  );

  return { answeredQuestion, unansweredQuestion };
};

export default compose(
  withQuestions,
  withUsers,
  connect(mapStateToProps)
)(({ answeredQuestion, unansweredQuestion, users, ...props }) => {
  const [showAnswered, toggleQuestionsDisplay] = useState(true);
  console.log(answeredQuestion);
  return (
    <div>
      <button onClick={() => toggleQuestionsDisplay(!showAnswered)}>
        Toggle
      </button>
      <ul>
        {[...(showAnswered ? answeredQuestion : unansweredQuestion)].map(q => (
          <li>
            <PollItem
              poll={q}
              author={users.find(user => user.id === q.author)}
            />
          </li>
        ))}
      </ul>
      <Loader />
    </div>
  );
});
