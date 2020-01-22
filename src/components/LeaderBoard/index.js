import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";

import withUsers from "../../containers/withUsers";

import styles from "./LeaderBoard.module.scss";

export default compose(
  withUsers,
  connect()
)(({ users }) => {
  const leaderBoardData = users
    .map(({ name, answers, questions, avatarURL, id }) => ({
      name,
      id,
      answers: Object.keys(answers).length,
      questions: Object.keys(questions).length,
      avatarURL
    }))
    .sort((a, b) => b.answers + b.questions - (a.answers + a.questions));
  return (
    <div className={styles.container}>
      <ul>
        {leaderBoardData.map(({ id, name, answers, questions, avatarURL }) => (
          <li key={id} className={styles.item}>
            <div className={styles.nestedContainer}>
              <img src={avatarURL} alt="" />
              <div className={styles.score}>
                <div>{name}</div>
                <div>
                  <span>Questions answered: {answers}</span>
                  <span>Questions asked: {questions}</span>
                  <span>Total score: {questions + answers}</span>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
});
