import React from "react";
import { Provider } from "react-redux";
import { NativeRouter, Route } from "react-router-native";

import store from "src/store";

import Home from "src/components/home/home";
import SearchHistory from "src/components/search-history/search-history";

export const App = () => (
  <Provider store={store}>
    <NativeRouter>
      <Route exact path="/" component={Home} />
      <Route path="/search-history" component={SearchHistory} />
    </NativeRouter>
  </Provider>
);

export default App;
