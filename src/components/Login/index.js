import React, { useState } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import withUsers from "../../containers/withUsers";
import { userLogin } from "../../actions/usersActions";

import styles from "./Login.module.scss";

const mapDispatchToProps = {
  userLogin
};

export default compose(
  withUsers,
  connect(null, mapDispatchToProps)
)(({ users, userLogin, ...props }) => {
  const [selectedUser, setSelectedUser] = useState("");
  return (
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
              <option value={user.id}>{user.name}</option>
            ))}
          </select>
        </fieldset>
        <fieldset>
          <input
            className={styles.primaryButton}
            readOnly
            value="Sign in"
            disabled={!selectedUser}
            onClick={() => {
              userLogin(selectedUser);
              props.history.push("/home");
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
