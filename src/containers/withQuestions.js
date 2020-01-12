import React from "react";
import { connect } from "react-redux";
import { requestQuestionsIfNeeded } from "../actions/questionActions";

function mapStateToProps(state, ownProps) {
  return { state };
}

const mapDispatchToProps = {
  requestQuestionsIfNeeded
};

export default WrappedComponent => {
  class Container extends React.PureComponent {
    componentDidMount() {
      this.props.requestQuestionsIfNeeded();
    }

    render() {
      const { requestQuestionsIfNeeded, ...props } = this.props;
      return <WrappedComponent {...props} />;
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(Container);
};
