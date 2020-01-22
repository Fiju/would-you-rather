import React, { useState } from "react";
import { compose } from "redux";
import { connect } from "react-redux";

import Loader from "../Loader";
import withUsers from "../../containers/withUsers";
import withQuestions from "../../containers/withQuestions";
import { PollItem } from "./PollItem";
import { selectQuestion } from "../../reducers/QuestionsReducer";

import styles from "./Home.module.scss";

const mapStateToProps = state => {
  const questions = selectQuestion(state);
  const loggedInUser = state.users.loggedInUser;
  const answeredQuestion = questions
    .filter(
      question =>
        question.optionOne.votes.includes(loggedInUser) ||
        question.optionTwo.votes.includes(loggedInUser)
    )
    .sort((a, b) => b.timestamp - a.timestamp);
  const unansweredQuestion = questions
    .filter(
      question =>
        !question.optionOne.votes.includes(loggedInUser) &&
        !question.optionTwo.votes.includes(loggedInUser)
    )
    .sort((a, b) => b.timestamp - a.timestamp);

  return { answeredQuestion, unansweredQuestion };
};

export default compose(
  withQuestions,
  withUsers,
  connect(mapStateToProps)
)(({ answeredQuestion, unansweredQuestion, users, ...props }) => {
  const [showAnswered, toggleQuestionsDisplay] = useState(false);

  return (
    <div className={styles.homeContainer}>
      {props.isLoading ? (
        <Loader />
      ) : (
        <>
          {" "}
          <button
            className={`secondary-button ${styles.toggle}`}
            onClick={() => toggleQuestionsDisplay(!showAnswered)}
          >
            Click to show {showAnswered ? "Unanswered" : "Answered"} Question
          </button>
          <ul>
            {[...(showAnswered ? answeredQuestion : unansweredQuestion)].map(
              q => (
                <li key={q.id}>
                  <PollItem
                    poll={q}
                    author={users.find(user => user.id === q.author)}
                  />
                </li>
              )
            )}
          </ul>
        </>
      )}
    </div>
  );
});
