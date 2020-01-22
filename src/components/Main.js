import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";

import Nav from "./Nav";
import Home from "./Home";
import Question from "./Question";
import LeaderBoard from "./LeaderBoard";
import AddQuestion from "./AddQuestion";
import RequireLogin from "./RequireLogin";
import withQuestions from "../containers/withQuestions";
import { requestQuestions } from "../actions/questionActions";

const mapStateToProps = state => ({ state });

const mapDispatchToProps = {
  requestQuestions
};

export default compose(
  withQuestions,
  connect(mapStateToProps, mapDispatchToProps)
)(props => {
  return (
    <RequireLogin>
      <Nav />
      <section className="main-body">
        <Switch>
          <Route path="/add" exact component={AddQuestion} />
          <Route path="/home" exact component={Home} />
          <Route path="/leaderboard" exact component={LeaderBoard} />
          <Route path="/questions/:questionId" exact component={Question} />
        </Switch>
      </section>
    </RequireLogin>
  );
});
