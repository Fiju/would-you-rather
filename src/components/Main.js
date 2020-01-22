import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";

import RequireLogin from "./RequireLogin";
import Nav from "./Nav";
import AddQuestion from "./AddQuestion";
import Home from "./Home";
import LeaderBoard from "./LeaderBoard";
import Question from "./Question";
import { requestQuestions } from "../actions/questionActions";

const mapStateToProps = state => ({ state });

const mapDispatchToProps = {
  requestQuestions
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
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
