import React from "react";

import styles from "./Home.module.scss";

export const PollItem = ({ poll, author }) => (
  <div className={styles.pollContainer}>
    <span className={styles.authorName}>{author.name} asks</span>
    <div className={styles.innerContainer}>
      <img src={author.avatarURL} alt="" />
      <div className={styles.questionContainer}>
        <label>Would you Rather...</label>
        <small>
          <i class="arrow right"></i>
          {poll.optionOne.text}
        </small>
        <small>
          <i class="arrow right"></i>
          {poll.optionTwo.text}
        </small>
      </div>
    </div>
  </div>
);
