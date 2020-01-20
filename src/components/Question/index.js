import React, { useState } from "react";
import { connect } from "react-redux";
import { selectQuestionById } from "../../reducers/QuestionsReducer";
import {
  selectLoggedInUser,
  selectUserById
} from "../../reducers/UsersReducer";

import styles from "./Question.module.scss";
import { saveAnswer } from "../../actions/questionActions";

const mapStateToProps = (state, ownProps) => {
  const question = selectQuestionById(state, ownProps.match.params.questionId);
  const user = selectLoggedInUser(state, state.users.loggedInUser);
  const author = selectUserById(state, question.author);
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
              <div>
                <label>{question.optionOne.text} </label>
                <span>
                  {optionOneUpvote} out of {totalResponses}
                </span>
                <hr />
                <small>
                  In favor: {(optionOneUpvote / totalResponses) * 100}%
                </small>
              </div>
              <div>
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
