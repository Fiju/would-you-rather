import React, { useState } from "react";
import classnames from "classnames";
import { connect } from "react-redux";

import pageNotFound from "../../assets/images/page-not-found.png";
import { selectQuestionById } from "../../reducers/QuestionsReducer";
import {
  selectLoggedInUser,
  selectUserById
} from "../../reducers/UsersReducer";
import { saveAnswer } from "../../actions/questionActions";

import styles from "./Question.module.scss";

const mapStateToProps = (state, ownProps) => {
  const question = selectQuestionById(state, ownProps.match.params.questionId);
  const user = selectLoggedInUser(state, state.users.loggedInUser);
  const author = question ? selectUserById(state, question.author) : null;
  return {
    question,
    user,
    author
  };
};

const mapDispatchToProps = {
  saveAnswer
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(({ question, user, author, saveAnswer }) => {
  if (!question) return <img src={pageNotFound} alt="" />;

  const [selectedOption, setSelectedOption] = useState(null);
  const isAnswered = Boolean(user.answers[question.id]);
  const { optionOneUpvote, optionTwoUpvote, totalResponses } = {
    optionOneUpvote: question.optionOne.votes.length,
    optionTwoUpvote: question.optionTwo.votes.length,
    totalResponses:
      question.optionOne.votes.length + question.optionTwo.votes.length
  };

  return (
    <div className={styles.container}>
      <span className={styles.authorName}>{author.name} asks</span>
      <div className={styles.innerContainer}>
        <img src={author.avatarURL} alt="" />
        <div className={styles.content}>
          <label>Would you Rather...</label>
          {isAnswered ? (
            <>
              <div
                className={classnames({
                  [styles.selected]: question.optionOne.votes.includes(user.id)
                })}
              >
                <label>{question.optionOne.text} </label>
                <span>
                  {optionOneUpvote} out of {totalResponses}
                </span>
                <hr />
                <small>
                  In favor: {(optionOneUpvote / totalResponses) * 100}%
                </small>
              </div>
              <div
                className={classnames({
                  [styles.selected]: question.optionTwo.votes.includes(user.id)
                })}
              >
                <label>{question.optionTwo.text} </label>
                <span>
                  {optionTwoUpvote} out of {totalResponses}
                </span>
                <hr />
                <small>
                  In favor: {(optionTwoUpvote / totalResponses) * 100}%
                </small>
              </div>
            </>
          ) : (
            <>
              <label>
                <input
                  type="radio"
                  value="optionOne"
                  onChange={e => setSelectedOption(e.target.value)}
                  checked={selectedOption === "optionOne"}
                />
                {question.optionOne.text}
              </label>
              <label>
                <input
                  type="radio"
                  value="optionTwo"
                  onChange={e => setSelectedOption(e.target.value)}
                  checked={selectedOption === "optionTwo"}
                />
                {question.optionTwo.text}
              </label>
              <button
                onClick={() => saveAnswer(user.id, question.id, selectedOption)}
              >
                Submit
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
});
