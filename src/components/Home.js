import React, { useState } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import withQuestions from "../containers/withQuestions";
import RequireLogin from "./RequireLogin";

const mapStateToProps = state => ({ state });

const mapDispatchToProps = {};

export default compose(
  withQuestions,
  connect(mapStateToProps, mapDispatchToProps)
)(({ state, ...props }) => {
  return <div>home</div>;
});
