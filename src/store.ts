import { createStore, compose, applyMiddleware } from "redux";

import apiMiddleware from "src/middlewares/api.middleware";

import rootReducer from "src/reducers/root.reducer";

const isDev = process.env.NODE_ENV !== "production";
const composeEnhancers = (isDev && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose; // prettier-ignore
const middlewares = [apiMiddleware];

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middlewares))
);

export default store;

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  }
}
