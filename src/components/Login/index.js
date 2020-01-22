import React, { useState } from "react";
import queryString from "query-string";
import { compose } from "redux";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

import Loader from "../Loader";
import withUsers from "../../containers/withUsers";
import { userLogin } from "../../actions/usersActions";

import styles from "./Login.module.scss";

const mapDispatchToProps = {
  userLogin
};

export default compose(
  withUsers,
  connect(null, mapDispatchToProps)
)(({ users, userLogin, isFetching, ...props }) => {
  const [selectedUser, setSelectedUser] = useState("");
  return isFetching ? (
    <Loader />
  ) : (
    <main className={styles.container}>
      <header>Select user to login</header>
      <form>
        <fieldset>
          <select
            value={selectedUser}
            onChange={e => setSelectedUser(e.target.value)}
          >
            <option value="">Select user...</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </fieldset>
        <fieldset>
          <input
            className="primaryButton"
            readOnly
            value="Sign in"
            disabled={!selectedUser}
            onClick={() => {
              userLogin(selectedUser);
              const { location } = props;
              const { ref } = queryString.parse(location.search);
              const path = ref ? ref : "/";
              props.history.push(path);
            }}
          />
        </fieldset>
      </form>
      <p>
        Not subscribed. Get started by registering{" "}
        <NavLink to="/signup"> here</NavLink>
      </p>
    </main>
  );
});
