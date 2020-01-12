import React, { useState } from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { compose } from "redux";
import withQuestions from "../containers/withQuestions";
import RequireLogin from "./RequireLogin";
import Nav from "./Nav";
import AddQuestion from "./AddQuestion";
import Home from "./Home";
import LeaderBoard from "./LeaderBoard";

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
        </Switch>
      </section>
    </RequireLogin>
  );
});
