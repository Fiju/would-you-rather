import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Main from "./components/Main";
import Authenticator from "./components/Authenticator";

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Authenticator} />
      <Route exact path="/login" component={Login} />
      <Route
        render={() => (
          <>
            <div>
              <Switch>
                <Route path="/(home|add|leaderboard)" component={Main} />
              </Switch>
            </div>
          </>
        )}
      />
    </Switch>
  );
}

export default App;
