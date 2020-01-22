import React, { useState } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import withUsers from "../../containers/withUsers";
import { addUser } from "../../actions/usersActions";
import { validateForm } from "../../lib/formValidator";

import styles from "../Login/Login.module.scss";

const mapDispatchToProps = {
  addUser
};

export default compose(
  withUsers,
  withRouter,
  connect(null, mapDispatchToProps)
)(({ users, addUser, history }) => {
  const [formFieldValue, setFormFieldValues] = useState({
    id: "",
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
            name="id"
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
              if (!users.find(user => user.id === formFieldValue.id)) {
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
