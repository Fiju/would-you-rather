import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const mapStateToProps = state => ({ isLoggedIn: state.users.loggedInUser });

const Authenticator = props =>
  props.isLoggedIn ? <Redirect to="/home" /> : <Redirect to="/login" />;

export default connect(mapStateToProps)(Authenticator);
