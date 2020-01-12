import { createStore, applyMiddleware, compose } from "redux";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";
import sagaMiddleware from "redux-saga";
import invariant from "redux-immutable-state-invariant";
import rootReducer from "../reducers";

export const history = createBrowserHistory();

const middleware = [sagaMiddleware, routerMiddleware(history)];

let composeEnhancers = compose;
if (process.env.NODE_ENV !== "production") {
  const logger = require("redux-logger").default;
  middleware.push(logger);
  middleware.push(invariant());
  // integration with browser developer tools
  composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || composeEnhancers;
}

export const configureStore = () => {
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(...middleware))
  );
  return store;
};
