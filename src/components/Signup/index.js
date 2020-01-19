import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import withUsers from "../../containers/withUsers";
import { validateForm } from "../../lib/formValidator";

import styles from "../Login/Login.module.scss";
import { addUser } from "../../actions/usersActions";
import { compose } from "redux";

const mapDispatchToProps = {
  addUser
};

export default compose(
  withUsers,
  withRouter,
  connect(null, mapDispatchToProps)
)(({ users, addUser, history }) => {
  const [formFieldValue, setFormFieldValues] = useState({
    username: "",
    name: "",
    avatarURL: ""
  });

  const onChange = e => {
    setFormFieldValues({
      ...formFieldValue,
      [e.target.name]: e.target.value
    });
  };

  return (
    <main className={styles.container}>
      <header>Select user to login</header>
      <form>
        <fieldset>
          <input
            value={formFieldValue.username}
            placeholder="Username"
            name="username"
            onChange={onChange}
          />
        </fieldset>
        <fieldset>
          <input
            onChange={onChange}
            value={formFieldValue.name}
            placeholder="Name"
            name="name"
          />
        </fieldset>
        <fieldset>
          <input
            value={formFieldValue.image}
            placeholder="Image"
            name="avatarURL"
            onChange={onChange}
          />
        </fieldset>
        <fieldset>
          <input
            onClick={() => {
              if (!users.find(user => user.id === formFieldValue.username)) {
                const promise = new Promise(res => {
                  addUser(formFieldValue, res);
                });

                promise.then(() => {
                  history.push("/home");
                });
              }
            }}
            className={styles.primaryButton}
            readOnly
            value="Sign up"
            disabled={!validateForm(formFieldValue)}
          />
        </fieldset>
      </form>
    </main>
  );
});
