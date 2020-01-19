import React from "react";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import { selectLoggedInUser } from "../reducers/UsersReducer";

const mapStateToProps = state => ({ isLoggedIn: state.users.loggedInUser });

class RequireLogin extends React.PureComponent {
  render() {
    if (this.props.isLoggedIn) {
      return this.props.children;
    } else {
      if (this.props.redirectTo) {
        return <Redirect to={this.props.redirectTo} />;
      } else {
        const path = this.props.location.pathname;
        return <Redirect to={`/login?ref=${path}`} />;
      }
    }
  }
}

export default withRouter(connect(mapStateToProps)(RequireLogin));
