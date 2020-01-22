import React, { useState } from "react";
import { connect } from "react-redux";

import { requestSaveQuestion } from "../../actions/questionActions";

import styles from "./AddQuestion.module.scss";

const mapStateToProps = state => ({
  author: state.users.loggedInUser
});

const mapDispatchToProps = {
  requestSaveQuestion
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(({ author, requestSaveQuestion, history }) => {
  const [optionOne, setOptionOne] = useState("");
  const [optionTwo, setOptionTwo] = useState("");
  return (
    <div className={styles.container}>
      <header>Would You Rather</header>
      <form>
        <fieldset>
          <input
            value={optionOne}
            onChange={e => setOptionOne(e.target.value)}
          />
        </fieldset>
        <fieldset>
          <input
            value={optionTwo}
            onChange={e => setOptionTwo(e.target.value)}
          />
        </fieldset>
        <fieldset>
          <input
            onClick={() => {
              requestSaveQuestion({
                author,
                optionOneText: optionOne,
                optionTwoText: optionTwo
              });
              history.push("/home");
            }}
            readOnly
            className="primaryButton"
            disabled={!Boolean(optionOne && optionTwo)}
            value="Submit"
          />
        </fieldset>
      </form>
    </div>
  );
});
