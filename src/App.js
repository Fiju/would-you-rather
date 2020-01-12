import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";

function App() {
  return (
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/home" component={Home} />
    </Switch>
  );
}

export default App;
