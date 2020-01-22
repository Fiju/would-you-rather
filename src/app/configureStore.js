import createSagaMiddleware from "redux-saga";
import invariant from "redux-immutable-state-invariant";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";
import { createStore, applyMiddleware, compose } from "redux";

import rootReducer from "../reducers";
import rootSaga from "../sagas/rootSaga";

export const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware, routerMiddleware(history)];

let composeEnhancers = compose;
if (process.env.NODE_ENV !== "production") {
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
  sagaMiddleware.run(rootSaga);
  return store;
};
