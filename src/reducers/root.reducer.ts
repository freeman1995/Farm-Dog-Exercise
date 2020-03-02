import { combineReducers } from "redux";

import network from "src/reducers/network.reducer";
import webSearchResults from "src/reducers/web-search-results.reducer";

const rootReducer = combineReducers({
  network,
  webSearchResults
});

export type State = ReturnType<typeof rootReducer>;

export default rootReducer;
