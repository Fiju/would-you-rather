import React from "react";
import { Switch, Route } from "react-router-dom";

import Main from "./components/Main";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Authenticator from "./components/Authenticator";

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Authenticator} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup} />
      <Route
        render={() => (
          <>
            <div>
              <Switch>
                <Route
                  path="/(home|add|leaderboard|questions)"
                  component={Main}
                />
              </Switch>
            </div>
          </>
        )}
      />
    </Switch>
  );
}

export default App;
