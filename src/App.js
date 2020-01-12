import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./components/Login";

function App() {
  return (
    <Switch>
      <Route path="/" component={Login} />
      <Route exact path="/login" component={Login} />
    </Switch>
  );
}

export default App;
