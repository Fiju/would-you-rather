import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import withUsers from "../containers/withUsers";
import { selectSubscribedUsers } from "../reducers/UsersReducer";

const mapStateToProps = state => ({ users: selectSubscribedUsers(state) });

export default compose(
  withUsers,
  connect(mapStateToProps)
)(({ users, ...props }) => {
  return <div>login</div>;
});
