import React from "react";
import { connect } from "react-redux";
import { requestQuestions } from "../actions/questionActions";

function mapStateToProps(state, ownProps) {
  return { state };
}

const mapDispatchToProps = {
  requestQuestions
};

export default WrappedComponent => {
  class Container extends React.PureComponent {
    componentDidMount() {
      this.props.requestQuestions();
    }

    render() {
      const { requestQuestions, ...props } = this.props;
      return <WrappedComponent {...props} />;
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(Container);
};
