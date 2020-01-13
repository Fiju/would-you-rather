import React, { useState } from "react";
import { connect } from "react-redux";
import { requestSaveQuestion } from "../actions/questionActions";
import { selectLoggedInUser } from "../reducers/UsersReducer";

const mapStateToProps = state => ({
  author: selectLoggedInUser(state).id
});

const mapDispatchToProps = {
  requestSaveQuestion
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(({ author, requestSaveQuestion }) => {
  const [optionOne, setOptionOne] = useState("");
  const [optionTwo, setOptionTwo] = useState("");
  return (
    <div>
      <input value={optionOne} onChange={e => setOptionOne(e.target.value)} />
      <input value={optionTwo} onChange={e => setOptionTwo(e.target.value)} />
      <button
        onClick={() =>
          requestSaveQuestion({
            author,
            optionOneText: optionOne,
            optionTwoText: optionTwo
          })
        }
      >
        Save
      </button>
    </div>
  );
});
