import React, { useState } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import withQuestions from "../containers/withQuestions";
import { selectQuestion } from "../reducers/QuestionsReducer";
import { selectLoggedInUser } from "../reducers/UsersReducer";

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

const mapDispatchToProps = {};

export default compose(
  withQuestions,
  connect(mapStateToProps, mapDispatchToProps)
)(({ answeredQuestion, unansweredQuestion, ...props }) => {
  const [showAnswered, toggleQuestionsDisplay] = useState(true);
  return (
    <div>
      <button onClick={() => toggleQuestionsDisplay(!showAnswered)}>
        Toggle
      </button>
      <ul>
        {[...(showAnswered ? answeredQuestion : unansweredQuestion)].map(q => (
          <li>{q.id}</li>
        ))}
      </ul>
    </div>
  );
});
