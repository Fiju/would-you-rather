import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import withUsers from "../containers/withUsers";

export default compose(
  withUsers,
  connect()
)(({ users }) => {
  const leaderBoardData = users
    .map(({ name, answers, questions }) => ({
      name,
      answers: Object.keys(answers).length,
      questions: Object.keys(questions).length
    }))
    .sort((a, b) => b.answers + b.questions - (a.answers + a.questions));
  return (
    <div>
      <ul>
        {leaderBoardData.map(({ name, answers, questions }) => (
          <li>
            <div>{name}</div>
            <div>{answers}</div>
            <div>{questions}</div>
            <div>{questions + answers}</div>
          </li>
        ))}
      </ul>
    </div>
  );
});
