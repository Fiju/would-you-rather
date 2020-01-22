import React from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";

import RequireLogin from "./RequireLogin";
import Nav from "./Nav";
import AddQuestion from "./AddQuestion";
import Home from "./Home";
import LeaderBoard from "./LeaderBoard";
import Question from "./Question";

const mapStateToProps = state => ({ state });

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(({ state, ...props }) => {
  return (
    <RequireLogin>
      <Nav />
      <section>
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
