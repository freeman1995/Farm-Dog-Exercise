import React, { FunctionComponent } from "react";
import { Provider } from "react-redux";

import store from "src/store";

import Root from "src/components/root";

export const App: FunctionComponent = ({ children }) => (
  <Provider store={store}>
    <Root />
  </Provider>
);

export default App;
