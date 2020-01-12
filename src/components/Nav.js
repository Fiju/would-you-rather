import React from "react";
import { connect } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";

const mapStateToProps = state => ({ state });

const mapDispatchToProps = {};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(({ state, ...props }) => {
    return (
      <section>
        <nav>
          <NavLink to="/home">Home</NavLink>
          <NavLink to="/add">Add</NavLink>
          <NavLink to="/leaderboard">Leader Board</NavLink>
        </nav>
      </section>
    );
  })
);
