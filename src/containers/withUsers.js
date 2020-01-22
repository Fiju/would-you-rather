import React from "react";
import { connect } from "react-redux";
import { requestUsersIfNeeded } from "../actions/usersActions";
import {
  selectSubscribedUsers,
  selectIsFetching
} from "../reducers/UsersReducer";

function mapStateToProps(state, ownProps) {
  return {
    users: selectSubscribedUsers(state),
    isFetching: selectIsFetching(state)
  };
}

const mapDispatchToProps = {
  requestUsersIfNeeded
};

export default WrappedComponent => {
  class Container extends React.PureComponent {
    componentDidMount() {
      this.props.requestUsersIfNeeded();
    }

    render() {
      const { requestUsersIfNeeded, ...props } = this.props;
      return <WrappedComponent {...props} />;
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(Container);
};
