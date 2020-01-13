import React, { useState } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import withUsers from "../containers/withUsers";
import { userLogin } from "../actions/usersActions";

const mapDispatchToProps = {
  userLogin
};

export default compose(
  withUsers,
  connect(null, mapDispatchToProps)
)(({ users, userLogin, ...props }) => {
  const [selectedUser, setSelectedUser] = useState("");
  return (
    <main>
      <select
        value={selectedUser}
        onChange={e => setSelectedUser(e.target.value)}
      >
        <option value=""></option>
        {users.map(user => (
          <option value={user.id}>{user.name}</option>
        ))}
      </select>
      <input
        readOnly
        value="Sign in"
        disabled={!selectedUser}
        onClick={() => {
          userLogin(selectedUser);
          props.history.push("/home");
        }}
      />
    </main>
  );
});
