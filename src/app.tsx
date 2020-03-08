import React from "react";
import { SafeAreaView } from "react-native";
import { NativeRouter, Route } from "react-router-native";
import { Provider } from "react-redux";
import styled from "styled-components/native";

import store from "src/store";

import Home from "src/components/home/home";
import SearchHistory from "src/components/search-history/search-history";

const FullHeightSafeAreaView = styled(SafeAreaView)`
  flex: 1;
`;

export const App = () => (
  <FullHeightSafeAreaView>
    <Provider store={store}>
      <NativeRouter>
        <Route exact path="/" component={Home} />
        <Route path="/search-history" component={SearchHistory} />
      </NativeRouter>
    </Provider>
  </FullHeightSafeAreaView>
);

export default App;
