import React from "react";
import { connect } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";

import { logoutUser } from "../../actions/usersActions";
import { selectUserById } from "../../reducers/UsersReducer";

import styles from "./Nav.module.scss";

const mapStateToProps = state => ({
  user: selectUserById(state, state.users.loggedInUser)
});

const mapDispatchToProps = {
  logoutUser
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(({ user, logoutUser, ...props }) => {
    return (
      <section className={styles.container}>
        <nav className={styles.navContainer}>
          <div className={styles.nav}>
            <div>
              <NavLink to="/home">Home</NavLink>
            </div>
            <div>
              <NavLink to="/add">Add</NavLink>
            </div>
            <div>
              <NavLink to="/leaderboard">Leader Board</NavLink>
            </div>
          </div>
          <div className={styles.nav}>
            <span>{user.name}</span>
            <span
              onClick={() => {
                logoutUser();
                props.history.push("/login");
              }}
            >
              Logout
            </span>
          </div>
        </nav>
      </section>
    );
  })
);
