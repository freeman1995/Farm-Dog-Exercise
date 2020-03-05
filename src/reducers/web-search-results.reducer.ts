import { handleActions } from "redux-actions";

import * as actions from "src/actions/web-search.actions";

const initialState = {};

export type WebSearchResult = {
  url: string;
  text: string;
  icon: string;
};

export type WebSearchResultsState = {
  general?: WebSearchResult[];
  [category: string]: WebSearchResult[];
};

const webSearchResultsReducer = handleActions<WebSearchResultsState, any>(
  {
    [actions.SET_WEB_SEARCH_RESULTS]: (
      state,
      action: ReturnType<typeof actions.setWebSearchResults>
    ) => action.payload.webSearchResults
  },
  initialState
);

export default webSearchResultsReducer;
